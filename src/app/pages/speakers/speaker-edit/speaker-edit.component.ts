import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Http, Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';

import {DataModelService} from '../../../services/data-model.service';
import {SpeakerService} from '../speaker.service';

import {AngularFireStorage} from 'angularfire2/storage';
import * as firebase from 'firebase/app';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Speaker} from "../speaker.model";

declare var $: any;

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.css']
})

export class SpeakerEditComponent implements OnInit {

  id: number;
  editMode = false;
  url: string;

  speakerForm: FormGroup;
  time_array: any[];
  speaker_time: {};

  speaker_photo_path_string: string;

  //
  selectedFile: File = null;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  //
  delete_email_speaker = '';
  delete_pass_speaker = '';
  delete_image_speaker = '';

  constructor(private route: ActivatedRoute,
              private speakerService: SpeakerService,
              public router: Router,
              private dataStorageService: DataModelService,
              private http: HttpClient, private afStorage: AngularFireStorage) {
  }


  //
  ngOnInit() {

    $(document).foundation();

    this.route.params.subscribe(
      (params: Params) => {

        this.id = +params['id'];
        this.editMode = params['id'] != null;

        this.initForm();
      }
    );

    window.scrollTo(0, 0);
  }

  onSubmit() {

    if (this.editMode) {
      this.speakerService.updateSpeaker(this.id, this.speakerForm.value);
      this.onStoreSpeakers();

    } else {

      const speaker_id_const_string = this.speakerForm.value.a_speaker_id.toLocaleUpperCase();
      const email = speaker_id_const_string + '@admin.test..com';
      const password = speaker_id_const_string;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
          // console.log(result);
          this.onCreateSpeaker(result.user.uid);
        })
        .catch(
          // error => console.log(error)
        );

    }

  }

  onCreateSpeaker(uid) {

    this.speakerService.addSpeaker(
      this.speakerForm.value
    );
    if (this.speakerForm.value.speaker_photo === null) {
      this.speakerForm.value.speaker_photo = '';
    }

    this.speakerForm.value.speaker_time.speaker_first_created = new Date();
    this.speakerForm.value.speaker_time.speaker_first_created_time = new Date();
    this.speakerForm.value.speaker_time.speaker_last_edited = new Date();
    this.speakerForm.value.speaker_time.speaker_last_edited_time = new Date();

    this.time_array = [
      this.speakerForm.value.speaker_time.speaker_first_created,
      this.speakerForm.value.speaker_time.speaker_first_created_time,
      this.speakerForm.value.speaker_time.speaker_last_edited,
      this.speakerForm.value.speaker_time.speaker_last_edited_time
    ];

    this.speakerForm.value.speaker_uid = uid;

    this.onStoreSpeakers();
  }

  onStoreSpeakers() {
    this.dataStorageService.storeSpeakers().subscribe(
      (response: Response) => {
        // console.log(response);
      }
    );

    this.onBack();
  }

  private initForm() {

    let a_speaker_id = '';
    let speaker_bio = '';
    let speaker_name_first = '';
    let speaker_name_last = '';

    let speaker_photo = this.speaker_photo_path_string;

    let speaker_first_created = '';
    let speaker_first_created_time = '';
    let speaker_last_edited = '';
    let speaker_last_edited_time = '';

    let speaker_uid = '';

    if (this.editMode) {

      const speaker = this.speakerService.getSpeaker(this.id);

      a_speaker_id = speaker.a_speaker_id.toLocaleUpperCase();
      speaker_bio = speaker.speaker_bio;
      speaker_name_first = speaker.speaker_name_first;
      speaker_name_last = speaker.speaker_name_last;

      if (this.speaker_photo_path_string !== undefined) {
      } else {
        if (speaker.speaker_photo !== undefined) {
          this.speaker_photo_path_string = speaker.speaker_photo.toString();
          speaker_photo = this.speaker_photo_path_string;
          this.delete_image_speaker = speaker_photo;

        }
      }

      this.speaker_time = {
        speaker_first_created = speaker.speaker_time.speaker_first_created,
        speaker_first_created_time = speaker.speaker_time.speaker_first_created_time,
        speaker_last_edited = speaker.speaker_time.speaker_last_edited,
        speaker_last_edited_time = speaker.speaker_time.speaker_last_edited_time
      } = speaker.speaker_time;

      speaker_uid = speaker.speaker_uid;

      //
      this.delete_email_speaker = a_speaker_id + '@admin.test.com';
      this.delete_pass_speaker = a_speaker_id;

    }

    this.speakerForm = new FormGroup({

      a_speaker_id: new FormControl(a_speaker_id.toLocaleUpperCase(), Validators.required),
      speaker_bio: new FormControl(speaker_bio),
      speaker_name_first: new FormControl(speaker_name_first),
      speaker_name_last: new FormControl(speaker_name_last),
      speaker_photo: new FormControl(speaker_photo),

      'speaker_time': new FormControl({
        speaker_first_created,
        speaker_first_created_time,
        speaker_last_edited,
        speaker_last_edited_time
      }),

      speaker_uid: new FormControl(speaker_uid)
    });
  }

  onImgSelected(event) {

    const file = event.target.files[0];
    const filePath = file.name;

    this.uploadProgress = this.afStorage.upload(filePath, file).percentageChanges();

    //
    const task = this.afStorage.upload(filePath, file).then(() => {
      const downloadURL = this.afStorage.ref(filePath).getDownloadURL().subscribe(url => {
        const Url = url;
        this.speaker_photo_path_string = Url.toString();

        this.initForm();
      });
    });

  }

  onDeleteSpeaker() {
    this.speakerService.deleteSpeaker(this.id);
    this.dataStorageService.storeSpeakers().subscribe(
      (response: Response) => {
        // console.log(response);
      }
    );

    if (this.delete_image_speaker !== '') {
      this.afStorage.storage.refFromURL(this.delete_image_speaker).delete()
        .catch(
          // error => console.log(error)
        );
    }

    firebase.auth().signInWithEmailAndPassword(this.delete_email_speaker, this.delete_pass_speaker)
      .then(function (info) {
        const user = firebase.auth().currentUser;
        user.delete();
      }).catch(
      // error => console.log(error);
    );

    this.onBack();

  }

  onBack() {
    this.router.navigate(['/speakers']);
  }

  ngOnDestroy() {
    // $('#are_you_sure_popup').foundation('_destroy');
  }

}

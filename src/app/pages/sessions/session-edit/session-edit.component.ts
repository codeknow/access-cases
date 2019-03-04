import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';
//
import {DataModelService} from '../../../services/data-model.service';
import {SessionService} from '../session.service';

import * as firebase from 'firebase/app';

declare var $: any;

@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.css']
})
export class SessionEditComponent implements OnInit {

  id: number;
  editMode = false;
  sessionForm: FormGroup;

  delete_email_session = '';
  delete_pass_session = '';

  constructor(private route: ActivatedRoute,
              private sessionService: SessionService,
              public router: Router,
              private dataStorageService: DataModelService) {
  }


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
      this.sessionService.updateSession(this.id, this.sessionForm.value);
      this.onStoreSessions();

    } else {

      const email = this.sessionForm.value.a_session_id + '@admin.test.com';
      const password = this.sessionForm.value.a_session_id;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
          this.onCreateSession(result.user.uid);
        })
        .catch(
          // error => console.log(error)
        );

    }

    this.dataStorageService.storeSessions().subscribe(
      (response: Response) => {
      }
    );

    this.onBack();

  }

  onCreateSession(uid) {

    this.sessionService.addSession(this.sessionForm.value);
    this.sessionForm.value.session_uid = uid;

    this.onStoreSessions();
  }

  onStoreSessions() {
    this.dataStorageService.storeSessions().subscribe(
      (response: Response) => {
      }
    );

    this.onBack();
  }

  private initForm() {

    let a_session_id = '';
    let b_speaker_id = '';
    let session_owner_name_first = '';
    let session_owner_name_last = '';
    let session_title = '';
    let session_location_city = '';
    let session_location_state = '';
    let session_location_venue = '';

    let session_start_date_month = '';
    let session_start_date_day = '';
    let session_start_date_year = '';

    let session_start_time_hour = '';
    let session_start_time_minute = '';
    let session_start_time_midday = '';

    let session_product = '';


    let session_uid = '';

    if (this.editMode) {
      const session = this.sessionService.getSession(this.id);

      a_session_id = session.a_session_id;
      b_speaker_id = session.b_speaker_id;

      session_owner_name_first = session.session_owner_name_first;
      session_owner_name_last = session.session_owner_name_last;

      session_title = session.session_title;
      session_location_city = session.session_location_city;
      session_location_state = session.session_location_state;
      session_location_venue = session.session_location_venue;
      session_start_date_month = session.session_start_date_month;
      session_start_date_day = session.session_start_date_day;
      session_start_date_year = session.session_start_date_year;
      session_start_time_hour = session.session_start_time_hour;
      session_start_time_minute = session.session_start_time_minute;
      session_start_time_midday = session.session_start_time_midday;
      session_product = session.session_product;

      session_uid = session.session_uid;

      this.delete_email_session = a_session_id + '@admin.test.com';
      this.delete_pass_session = a_session_id;

    }

    //

    this.sessionForm = new FormGroup({
      a_session_id: new FormControl(a_session_id, Validators.required),

      b_speaker_id: new FormControl(b_speaker_id),
      session_owner_name_first: new FormControl(session_owner_name_first),
      session_owner_name_last: new FormControl(session_owner_name_last),
      session_title: new FormControl(session_title),
      session_location_city: new FormControl(session_location_city),
      session_location_state: new FormControl(session_location_state),
      session_location_venue: new FormControl(session_location_venue),
      session_start_date_month: new FormControl(session_start_date_month),
      session_start_date_day: new FormControl(session_start_date_day),
      session_start_date_year: new FormControl(session_start_date_year),
      session_start_time_hour: new FormControl(session_start_time_hour),
      session_start_time_minute: new FormControl(session_start_time_minute),
      session_start_time_midday: new FormControl(session_start_time_midday),
      session_product: new FormControl({value: 'ZINPLAVA', disabled: true}),
      session_uid: new FormControl(session_uid)
    });

  }


  onDeleteSession() {
    this.sessionService.deleteSession(this.id);
    this.dataStorageService.storeSessions().subscribe(
      (response: Response) => {
      }
    );

    firebase.auth().signInWithEmailAndPassword(this.delete_email_session, this.delete_pass_session)
      .then(function (info) {
        const user = firebase.auth().currentUser;
        user.delete();
      }).catch(
      // error => console.log(error);
    );

    this.onBack();
  }

  onBack() {
    this.router.navigate(['../sessions']);
  }

  ngOnDestroy() {
  }

}

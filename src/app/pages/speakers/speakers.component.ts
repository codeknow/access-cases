import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DataModelService} from '../../services/data-model.service';

import {SpeakerService} from "./speaker.service";
import {Speaker} from "./speaker.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css'],
})
export class SpeakersComponent implements OnInit {

  loadedSpeaker = 'speaker';

  speakers: Speaker[];
  subscription: Subscription;

  speakerFilter: any = {
    a_speaker_id: '', speaker_name_first: '',
    speaker_name_last: ''
  };

  onNavigate(feature: string) {
    this.loadedSpeaker = feature;
  }

  constructor(private route: ActivatedRoute, public router:
    Router, private dataModelService: DataModelService, private speakerService: SpeakerService) {
  }

  ngOnInit() {

    this.subscription = this.speakerService.speakersChanged.subscribe(
      (speakers: Speaker[]) => {
        this.speakers = speakers;
      }
    );
    this.speakers = this.speakerService.getSpeakers();
    this.dataModelService.getSpeakers();

    window.scrollTo(0, 0);
  }

  onResetSpeaker() {
    this.speakerFilter.a_speaker_id = '';
    this.speakerFilter.speaker_name_first = '';
    this.speakerFilter.speaker_name_last = '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DataModelService} from '../../services/data-model.service';

import {SessionService} from "./session.service";
import {Session} from "./session.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  loadedSession = 'session';

  sessions: Session[];
  subscription: Subscription;

  sessionFilter: any = {
    a_session_id: '', b_speaker_id: '',
    session_location_city: '', session_location_state: '', session_start_date_month: ''
  };

  onNavigate(feature: string) {
    this.loadedSession = feature;
  }

  constructor(private route: ActivatedRoute,
              public router: Router,
              private dataModelService: DataModelService,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.dataModelService.getSessions();
    this.subscription = this.sessionService.sessionsChanged.subscribe(
      (sessions: Session[]) => {
        this.sessions = sessions;
      }
    );
    this.sessions = this.sessionService.getSessions();
    window.scrollTo(0, 0);
  }

  onResetSession() {
    this.sessionFilter.a_session_id = '';
    this.sessionFilter.b_speaker_id = '';
    this.sessionFilter.session_location_city = '';
    this.sessionFilter.session_location_state = '';
    this.sessionFilter.session_start_date_month = '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

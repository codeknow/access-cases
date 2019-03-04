import {Injectable} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

//
import {SpeakerService} from '../pages/speakers/speaker.service';
import {Speaker} from '../pages/speakers/speaker.model';

//
import {SessionService} from '../pages/sessions/session.service';
import {AuthService} from '../auth/auth.service';


@Injectable()

export class DataModelService {

  constructor(private http: Http,
              private speakerService: SpeakerService,
              private sessionService: SessionService,
              private authService: AuthService) {
  }

  storeSessions() {
    const token = this.authService.getIdToken();

    return this.http.put('https://access-cases /sessions.json?auth=' + token,
      this.sessionService.getSessions());
  }

  getSessions() {
    const token = this.authService.getIdToken();

    this.http.get('https://access-cases /sessions.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          const sessions = response.json();

          if (sessions !== null) {
            this.sessionService.setSessions(sessions);
          }

        }
      );
  }

  storeSpeakers() {
    const token = this.authService.getIdToken();

    return this.http.put('https://access-cases /speakers.json?auth=' + token,
      this.speakerService.getSpeakers());
  }

  getSpeakers() {
    const token = this.authService.getIdToken();

    this.http.get('https://access-cases /speakers.json?auth=' + token)
      .map(
        (response: Response) => {

          const speakers: Speaker[] = response.json();

          if (Speaker !== null) {
            for (const speaker of speakers) {
              if (!speaker['speaker_time']) {
                speaker['speaker_time'][''] = [];
              }
            }
            return speakers;
          }

        }
      )
      .subscribe(
        (speakers: Speaker[]) => {
          this.speakerService.setSpeakers(speakers);
        }
      );
  }

}

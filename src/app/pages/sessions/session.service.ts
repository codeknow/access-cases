import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Session} from './session.model';

export class SessionService {
  sessionsChanged = new Subject<Session[]>();

  private sessions: Session[] = [];

  setSessions(sessions: Session[]) {
    this.sessions = sessions;
    this.sessionsChanged.next(this.sessions.slice());
  }

  getSessions() {
    return this.sessions.slice();
  }

  getSession(index: number) {
    return this.sessions[index];
  }

  addSession(session: Session) {
    this.sessions.push(session);
    this.sessionsChanged.next(this.sessions.slice());
  }

  updateSession(index: number, newSession: Session) {
    this.sessions[index] = newSession;
    this.sessionsChanged.next(this.sessions.slice());
  }

  deleteSession(index: number) {
    this.sessions.splice(index, 1);
    this.sessionsChanged.next(this.sessions.slice());
  }

}

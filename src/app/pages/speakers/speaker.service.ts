import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Speaker} from './speaker.model';

export class SpeakerService {
  speakersChanged = new Subject<Speaker[]>();

  private speakers: Speaker[] = [];

  setSpeakers(speakers: Speaker[]) {
    this.speakers = speakers;
    this.speakersChanged.next(this.speakers.slice());
  }

  getSpeakers() {
    return this.speakers.slice();
  }

  getSpeaker(index: number) {
    return this.speakers[index];
  }

  addSpeaker(speaker: Speaker) {
    this.speakers.push(speaker);
    this.speakersChanged.next(this.speakers.slice());
  }

  updateSpeaker(index: number, newSpeaker: Speaker) {
    this.speakers[index] = newSpeaker;
    this.speakersChanged.next(this.speakers.slice());
  }

  deleteSpeaker(index: number) {
    this.speakers.splice(index, 1);
    this.speakersChanged.next(this.speakers.slice());
  }

}

import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = '';

  today = new Date();
  yyyy = this.today.getFullYear();

  constructor() {
  }

  ngOnInit() {

    firebase.initializeApp({

      apiKey: '',
      authDomain: 'access-cases',
      storageBucket: 'access-cases'


    });


    window.scrollTo(0, 0);
  }

}

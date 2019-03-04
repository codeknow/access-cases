import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  onNewSpeaker() {
    this.router.navigate(['speakers/build']);
  }
  onNewSession() {
    this.router.navigate(['sessions/build']);
  }

}

import {Component, OnInit, Input} from '@angular/core';
import {Session} from "../session.model";

@Component({
  selector: 'app-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.css']
})
export class SessionItemComponent implements OnInit {

  @Input() session: Session;
  @Input() index: number;

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs-title',
  templateUrl: './tabs-title.component.html',
  styleUrls: ['./tabs-title.component.css']
})
export class TabsTitleComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}

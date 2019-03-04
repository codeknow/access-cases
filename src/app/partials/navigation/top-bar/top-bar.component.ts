import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {DataModelService} from '../../../services/data-model.service';
import {AuthService} from '../../../auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private dataStorageService: DataModelService,
              public router: Router,
              public authService: AuthService) {
  }

  ngOnInit() {
    $(document).foundation();
  }

  onSaveData() {
    this.dataStorageService.storeSpeakers().subscribe(
      (response: Response) => {
        // console.log(response);
      }
    );
  }

  onFetchData() {
    this.dataStorageService.getSpeakers();
  }

  onLogout() {
    this.authService.logout();
  }

}

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    $(document).foundation();
    window.scrollTo(0, 0);
  }

  onSignup(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.authService.signupAdmin(email, password);

  }

}

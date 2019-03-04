import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {
  }

  signupAdmin(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['/sessions']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
      })
      .catch(
        // error => console.log(error)
      );
  }

  signinAdmin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/sessions']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        // error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getIdToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }


}

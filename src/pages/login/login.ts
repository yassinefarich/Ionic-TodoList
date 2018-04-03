import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {ToDoAppGoogleAuthProvider} from '../../providers/google-auth/google-auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private userProfile: any = null;

  constructor(private authProvider: ToDoAppGoogleAuthProvider) {

    this.authProvider.getFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });
  }

  logOut() {
    this.authProvider.logOut();
  }

  logIn() {
    this.authProvider.logIn();
  }

}

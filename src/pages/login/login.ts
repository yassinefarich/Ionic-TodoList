import {Component, Injector} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GooglePlus} from '@ionic-native/google-plus';
import firebase from 'firebase';
import {ToDoAppGoogleAuthProvider} from '../../providers/google-auth/google-auth';
import {GoogleWebAuthProvider} from '../../providers/google-auth/google-web-auth';
import {GooglePlusAuthProvider} from '../../providers/google-auth/google-plus-auth';

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
    this.authProvider.getFirebaseAuth().signOut();
  }

  logIn() {
    this.authProvider.logIn();
  }

}

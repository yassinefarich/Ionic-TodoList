import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GooglePlus} from '@ionic-native/google-plus';
import firebase from 'firebase';
import {ToDoAppGoogleAuthProvider} from './google-auth';

const NATIVE_AUTH_OPTION = {
  'webClientId': '143451751699-i0l7oqlottrluaaol7cdqudbcb531m12.apps.googleusercontent.com',
  'offline': true
};

@Injectable()
export class GooglePlusAuthProvider extends ToDoAppGoogleAuthProvider {

  //TODO look for how to replace this variable with real console
  private simulatedConsole = '';

  constructor(private googlePlus: GooglePlus) {
    super();
    console.log('Hello ToDoAppGoogleAuthProvider Provider');
  }

  logIn(): void {
    this.googlePlus
      .login(NATIVE_AUTH_OPTION)
      .then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(googleCredential).then(response => {
          console.log("Firebase success: " + JSON.stringify(response));
          this.simulatedConsole = "Firebase success: " + JSON.stringify(response);
        });
      }, err => {
        console.error("Error: ", err)
        this.simulatedConsole = "Error: " + err;
      });
  }

  logOut() {
    this.googlePlus.logout();
  }


}

import {Injectable} from '@angular/core';
import {GooglePlus} from '@ionic-native/google-plus';
import firebase from 'firebase';
import {GoogleAuthInterface} from './google-auth-i';
import {AngularFireAuth} from 'angularfire2/auth';
import {NATIVE_AUTH_OPTION} from '../../thirdParty-services-settings';

@Injectable()
export class GooglePlusAuthProvider implements GoogleAuthInterface {

  private simulatedConsole = '';

  constructor(private googlePlus: GooglePlus , public afAuth: AngularFireAuth) {
    console.log('Hello ToDoAppGoogleAuthProvider Provider');
  }

  logIn(): Promise<any> {
    return this.googlePlus
      .login(NATIVE_AUTH_OPTION)
      .then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(googleCredential).then(response => {
          console.log('Firebase success: ' + JSON.stringify(response));
          this.simulatedConsole = 'Firebase success: ' + JSON.stringify(response);
        });
      }, err => {
        console.error('Error: ', err)
        this.simulatedConsole = 'Error: ' + err;
      });
  }

  logOut(): Promise<any> {
    this.afAuth.auth.signOut();
    return this.googlePlus.logout();
  }


}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ToDoAppGoogleAuthProvider} from './google-auth';
import {GoogleAuthInterface} from './google-auth-i';

@Injectable()
export class GoogleWebAuthProvider implements GoogleAuthInterface {

  constructor(public afAuth: AngularFireAuth) {
    console.log('Hello ToDoAppGoogleAuthProvider Provider');
  }

  logIn(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }


}

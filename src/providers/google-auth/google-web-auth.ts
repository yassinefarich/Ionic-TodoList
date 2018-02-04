import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {ToDoAppGoogleAuthProvider} from './google-auth';

@Injectable()
export class GoogleWebAuthProvider extends ToDoAppGoogleAuthProvider {

  constructor(public afAuth: AngularFireAuth,) {
    super();
    console.log('Hello ToDoAppGoogleAuthProvider Provider');
  }

  logIn() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut();
  }


}

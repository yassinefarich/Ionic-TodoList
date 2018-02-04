import {Injectable} from '@angular/core';
import firebase from 'firebase';

@Injectable()
export abstract class ToDoAppGoogleAuthProvider {

  getFirebaseAuth(): firebase.auth.Auth {
    return firebase.auth();
  }

  abstract logIn(): any;
  abstract logOut(): any;

}

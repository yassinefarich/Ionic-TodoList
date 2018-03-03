import {Injectable, Injector} from '@angular/core';
import firebase from 'firebase';
import {GoogleAuthInterface} from './google-auth-i';
import {Platform} from 'ionic-angular';
import {GoogleWebAuthProvider} from './google-web-auth';
import {GooglePlusAuthProvider} from './google-plus-auth';

// This class is used as a bridge to Google Authentication
@Injectable()
export class ToDoAppGoogleAuthProvider {

  private authProvider: GoogleAuthInterface = undefined;

  constructor(public platform: Platform, private injector: Injector) {
    this.injectAuthProvider();
  }

  /**
   * Inject The AuthentificationProvider depending on platform type :
   *    - authProvider <- GoogleWeb Authentification , if the platform is Web Browser
   *    - authProvider <- GooglePlus Authentification , if the platform is Mobile(Android/IOS)
   */
  private injectAuthProvider() {
    if (this.appIsRunningOnWebBrowser()) {
      this.authProvider = this.injector.get(GoogleWebAuthProvider);
    } else {
      this.authProvider = this.injector.get(GooglePlusAuthProvider);
    }
  }

  private appIsRunningOnWebBrowser(): boolean {
    return this.platform.is('core') || this.platform.is('mobileweb');
  }

  public getFirebaseAuth(): firebase.auth.Auth {
    return firebase.auth();
  }

  public logIn() {
    return this.authProvider.logIn();
  }

  public logOut() {
    return this.authProvider.logIn();
  }

}

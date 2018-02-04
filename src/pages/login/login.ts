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
  private authProvider: ToDoAppGoogleAuthProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private injector: Injector) {

    this.injectAuthProvider();

    this.authProvider.getFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });

  }

  /**
   * Inject The AuthentificationProvider depending on platform type :
   *    - authProvider <- GoogleWeb Authentification , if the platform is Web Browser
   *    - authProvider <- GooglePlus Authentification , if the platform is Mobile(Android/IOS)
   */
  private injectAuthProvider() {
    if (this.appIsRunningOnWebBrowser()) {
      this.authProvider = this.injector.get(GoogleWebAuthProvider);
    }
    else {
      this.authProvider = this.injector.get(GooglePlusAuthProvider);
    }
  }

  private appIsRunningOnWebBrowser(): boolean {
    return this.platform.is('core') || this.platform.is('mobileweb');
  }

  logOut() {
    if (null != this.authProvider) {
      this.authProvider.logOut();
    }
  }

  logIn()
  {
    if (null != this.authProvider) {
      this.authProvider.logIn();
    }
  }

}

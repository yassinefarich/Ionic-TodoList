import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-web-auth',
  templateUrl: 'web-auth.html',
})
//TODO : !!!! This component is never user please delete It
export class WebAuthPage {

  userProfile: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams , public afAuth: AngularFireAuth) {

    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
        console.log(`User Authentified ${this.userProfile.displayName}`)
      } else {
        this.userProfile = null;
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebAuthPage');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}

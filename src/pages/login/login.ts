import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  userProfile: any = null;
  simulatedConsole : string = 'Hello';

  constructor(public navCtrl: NavController, public navParams: NavParams, private googlePlus: GooglePlus) {

    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(): void {
    this.googlePlus.login({
      'webClientId': '143451751699-i0l7oqlottrluaaol7cdqudbcb531m12.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
   
            firebase.auth().signInWithCredential(googleCredential).then( response => {
              console.log("Firebase success: " + JSON.stringify(response));
              this.simulatedConsole = "Firebase success: " + JSON.stringify(response) ;
            
            
            });
    }, err => {
        console.error("Error: ", err)
        this.simulatedConsole = "Error: "+ err ;
    });
  }


}

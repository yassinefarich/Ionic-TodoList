import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoListsPage} from '../todo-lists/todo-lists';
import {ToDoAppGoogleAuthProvider} from '../../providers/google-auth/google-auth';
import * as firebase from 'firebase/app';
import {FIREBASE_CONFIG} from '../../thirdParty-services-settings';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TodoServiceProvider]
})
export class HomePage implements OnInit {

  private userProfile: any = null;

  constructor(private navCtrl: NavController,
              private authProvider: ToDoAppGoogleAuthProvider) {
  }


  ngOnInit(): void {

    /** Init firebase app :
     this is needed when running app on android fir the first Time
     */
    if (firebase.apps.length < 1) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }

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
  }

  logIn() {
    this.authProvider.logIn();
  }


  showTodoLists() {
    this.navCtrl.push(TodoListsPage);
  }


}

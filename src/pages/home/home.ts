import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoList} from '../../model/todo-list';
import {ItemListPage} from '../item-list/item-list';
import {TodoListsPage} from '../todo-lists/todo-lists';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {LoginPage} from '../login/login';
import {ToDoAppGoogleAuthProvider} from '../../providers/google-auth/google-auth';
import {FIREBASE_CONFIG} from '../../fireBase-Settings';
import {AngularFireModule} from 'angularfire2';
import * as firebase from 'firebase/app';


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

    // Init firebase app ,
    // this is needed when running app on android fir the first Time
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

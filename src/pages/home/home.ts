import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoList} from '../../model/todo-list';
import {ItemListPage} from '../item-list/item-list';
import {TodoListsPage} from '../todo-lists/todo-lists';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {LoginPage} from '../login/login';
import {ToDoAppGoogleAuthProvider} from '../../providers/google-auth/google-auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TodoServiceProvider]
})
export class HomePage implements OnInit {

  private userProfile: any = null;

  ngOnInit(): void {

    this.authProvider.getFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });

  }

  constructor(public navCtrl: NavController, private authProvider: ToDoAppGoogleAuthProvider) {
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

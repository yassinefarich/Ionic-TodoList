import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoList} from '../../model/TodoList';
import {ItemListPage} from '../item-list/item-list';
import {TodoListsPage} from '../todo-lists/todo-lists';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {LoginPage} from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TodoServiceProvider]
})
export class HomePage implements OnInit {

  private todoLists: TodoList[];
  private db;

  ngOnInit(): void {

    console.log("---------------- DB")

    this.todosDatabase.list('/').valueChanges().subscribe(
      x => console.log(x)
    );

    this.todoListService.getList().subscribe(x => {
      this.todoLists = x
    })
  }


  constructor(public navCtrl: NavController, private todoListService: TodoServiceProvider, private todosDatabase: AngularFireDatabase) {

  }


  showTodoLists() {
    this.navCtrl.push(TodoListsPage);
  }


  showLoginPage() {
    this.navCtrl.push(LoginPage);
  }

}

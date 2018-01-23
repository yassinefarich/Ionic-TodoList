import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoList} from '../../model/TodoList';
import {TodoListePage} from '../todo-liste/todo-liste';
import {TodoListsPage} from '../todo-lists/todo-lists';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  private todoLists:TodoList[];

  ngOnInit(): void {
    this.todoListService.getList().subscribe(x => {
      this.todoLists = x
    })
  }



  constructor(public navCtrl: NavController , private todoListService:TodoServiceProvider) {

  }


  showTodoLists()
  {
    this.navCtrl.push(TodoListsPage);
  }



}

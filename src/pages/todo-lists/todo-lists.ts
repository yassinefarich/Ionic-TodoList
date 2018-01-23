import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoList} from '../../model/TodoList';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoListePage} from '../todo-liste/todo-liste';

/**
 * Generated class for the TodoListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-lists',
  templateUrl: 'todo-lists.html',
})
export class TodoListsPage implements OnInit {

  private todoLists: TodoList[];

  ngOnInit(): void {
    this.todoListService.getList().subscribe(x => {
      this.todoLists = x
    })
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private todoListService: TodoServiceProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListsPage');
  }


  itemSelected(todoList: TodoList) {
    console.log("A todoList Has been selected ");
    this.navCtrl.push(TodoListePage, {'idListe': todoList.uuid });
  }


  addNewTodoList() {

    let prompt = this.alertCtrl.create({
      title: 'New TodoList',
      message: "Enter a name for the new TodoList ",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Add new todoList canceled');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Save new TodoList' + data.title);
            this.createNewTodoListWithName(data.title);
            console.log(data.title);
          }
        }
      ]
    });
    prompt.present();
  }


  createNewTodoListWithName(name: string) {
    this.todoListService.createNewTodoList(name);
  }


}

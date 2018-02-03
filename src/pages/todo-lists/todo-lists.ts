import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoList} from '../../model/TodoList';
import {TodoServiceProvider} from '../../services/todo-service';
import {ItemListPage} from '../item-list/item-list';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';
import {TodoItem} from '../../model/TodoItem';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private todoListService: TodoServiceProviderFireBase, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListsPage');
  }

  itemSelected(todoList: TodoList) {
    this.navCtrl.push(ItemListPage, {'idListe': todoList.uuid});
  }

  addOrEditTodoList(todoList?, item?) {

    let addNewTodoListAlert = this.alertCtrl.create({
      title: 'Ajouter ou Modifier un TodoList',
      message: "Entrer le nom de la TodoList ",
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value: undefined !== todoList ? todoList.name : '',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            if (undefined !== item) item.close();
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (undefined !== todoList) {
              todoList.name = data.name
            }
            else {
              this.createNewTodoListWithName(data.name);
            }
            if (undefined !== item) item.close();
          }
        }
      ]
    });
    addNewTodoListAlert.present();

  }

  createNewTodoListWithName(name: string) {
    this.todoListService.createNewTodoList(name);
  }

  deleteList(todoList) {
    this.todoListService.deleteTodoList(todoList);
  }


  numberOfUncompletedTodos(todoList: TodoList): number {
    //TODO : This is a bad function :( , re-check it please
    if (undefined == todoList.items) return 0;
    var itemsAsArray: TodoItem[] = Object.keys(todoList.items)
      .map(key => todoList.items[key]);

    return itemsAsArray.filter(x => !x.complete).length;
  }

}

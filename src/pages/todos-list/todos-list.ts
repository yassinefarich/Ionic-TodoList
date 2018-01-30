import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoList} from '../../model/TodoList';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoItem} from '../../model/TodoItem';

/**
 * Generated class for the TodoListePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-liste',
  templateUrl: 'todos-list.html',
})
export class TodoListePage implements OnInit {

  private todoListUUid: string = '';
  private todoList: TodoList;

  private todos: TodoItem[];


  ngOnInit(): void {
    this.todoListUUid = this.params.get('idListe');
    this.todoList = this.todoListService.getTodoListByUUID(this.todoListUUid);

    this.todoListService.getTodos(this.todoListUUid).subscribe(x => {
      this.todos = x;
    });

  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public params: NavParams, public navParams: NavParams, public todoListService: TodoServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListePage');
  }

  deleteItem(todoItem: TodoItem) {

    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression ',
      message: 'Veuillez confirmer la suppression de l item ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.todoListService.deleteTodo(this.todoListUUid, todoItem.uuid)
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }


  addOrEditItem(todoItem?, item?) {
    let prompt = this.alertCtrl.create({
      title: 'Edition de Todo',
      message: "Entrer le nouveau nom de la Todo ",
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value: undefined !== todoItem ? todoItem.name : '',
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

            if (undefined !== todoItem) {
              todoItem.name = data.name
            }
            else {
              this.addNewTodoToList(data);
            }

            if (undefined !== item) item.close();
          }
        }
      ]
    });
    prompt.present();
  }


  addNewTodoToList(data) {

    this.todoList.items.push({
      uuid: "",
      complete: false,
      name: data.name
    })

  }

}

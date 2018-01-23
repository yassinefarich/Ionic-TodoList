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
  templateUrl: 'todo-liste.html',
})
export class TodoListePage implements OnInit {

  private todoListUUid : string = '';
  private todoList : TodoList ;

  private todos : TodoItem[];


  ngOnInit(): void {
    this.todoListUUid = this.params.get('idListe');
    this.todoList = this.todoListService.getTodoListByUUID(this.todoListUUid);

    this.todoListService.getTodos(this.todoListUUid).subscribe(x => {
      this.todos = x;
    });

  }

  constructor(public navCtrl: NavController,public alertCtrl: AlertController ,public params:NavParams , public navParams: NavParams ,public todoListService:TodoServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListePage');
  }

  deleteItem(todoItem : TodoItem)
  {

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


  addNewTodo(){
      let prompt = this.alertCtrl.create({
        title: 'Todo List name ',
        message: "Enter a name for the new Todo",
        inputs: [
          {
            name: 'name',
            placeholder: 'Name'
          },
          {
            name: 'desc',
            placeholder: 'Description'
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
              console.log('Add the new Todo' + data.title);
              this.addNewTodoToList(data);
              console.log(data.title);
            }
          }
        ]
      });
      prompt.present();
  }


addNewTodoToList(data){

    this.todoList.items.push({
      uuid : "",
      complete : false,
      name : data.name
    })

}

}

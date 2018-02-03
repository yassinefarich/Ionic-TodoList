import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoList} from '../../model/TodoList';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoItem} from '../../model/TodoItem';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';

/**
 * Generated class for the ItemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-liste',
  templateUrl: 'item-list.html',
})
export class ItemListPage implements OnInit {

  private todoListUUid: string = '';
  private todoListName: string = 'TodoListNAme';

  private todos: TodoItem[];


  ngOnInit(): void {
    this.todoListUUid = this.params.get('idListe');
    //this.todoListName = 'TodoListName';
    //this.todoListService.getTodoListByUUID(this.todoListUUid);

    this.todoListService.getTodosAsObservable(this.todoListUUid).subscribe(x => {
      this.todos = x;
    });

  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public params: NavParams, public navParams: NavParams, public todoListService: TodoServiceProviderFireBase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
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
              todoItem.name = data.name ;
              this.todoListService.updateTodo(this.todoListUUid , todoItem)
            }
            else {
              this.todoListService.createNewTodo(this.todoListUUid ,
                {name : data.name , complete : false , uuid : '0'})
            }

            if (undefined !== item) item.close();
          }
        }
      ]
    });
    prompt.present();
  }

}

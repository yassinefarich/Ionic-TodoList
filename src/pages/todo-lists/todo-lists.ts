import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoList} from '../../model/todo-list';
import {TodoServiceProvider} from '../../services/todo-service';
import {ItemListPage} from '../item-list/item-list';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';
import {TodoItem} from '../../model/todo-item';
import {SharedAlertProvider} from '../../providers/shared-alert-service/shared-alert';

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

  private personalTodoLists: TodoList[];
  private sharedTodoLists: string[];

  ngOnInit(): void {
    this.todoListService.getList().subscribe(x => {
      this.personalTodoLists = x;
    });

    this.todoListService.getSharedList().subscribe(x => {
      this.sharedTodoLists = x;
    });
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private todoListService: TodoServiceProviderFireBase,
              private sharedAlertProvider: SharedAlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListsPage');
  }

  itemSelected(todoList: TodoList) {
    this.navCtrl.push(ItemListPage, {'idListe': todoList.uuid, 'listName': todoList.name});
  }

  addOrEditTodoList(todoList?, item?) {

    let prompt = null;
    if (undefined !== todoList) {
      prompt = this.sharedAlertProvider
        .buildPromptAlert()
        .withTitle('Modification de la TodoList')
        .withMessage('Veuillez entrer les informations de la TodoList')
        .withInputs([{
          name: 'name',
          placeholder: 'name',
          value: todoList.name,
        }])
        .withOnOkHandler(data => {
          todoList.name = data.name;
          this.todoListService.updateTodoList(todoList);
          item.close();
        })
        .withOnCancelHandler(data => {
          item.close();
        })
        .build();
    } else {
      prompt = this.sharedAlertProvider
        .buildPromptAlert()
        .withTitle('Ajouter un nouveau TodoList')
        .withMessage('Veuillez entrer les informations de la TodoList')
        .withInputs([{
          name: 'name',
          placeholder: 'name',
          value: '',
        }])
        .withOnOkHandler(data => {
          this.todoListService.createNewTodoList(data.name);
        })
        .withOnCancelHandler(data => {
        })
        .build();
    }

    prompt.present();
  }


  deleteList(todoList) {

    this.sharedAlertProvider
      .buildConfirmationAlert()
      .withTitle('Confirmation de suppression')
      .withMessage('Veuillez confirmer la suppression de la liste ?')
      .withOnOkHandler(() => this.todoListService.deleteTodoList(todoList))
      .build()
      .present();
  }

  shareTodoList(todoList)
  {
    alert("Share TodoList")
    this.todoListService.shareListWith(todoList);
  }

  numberOfUncompletedTodos(todoList: TodoList): number {
    // TODO : This is a baaaad function :( , re-check it please

    if (undefined !== todoList.items) {
      const itemsAsArray: TodoItem[] = Object.keys(todoList.items)
        .map(key => todoList.items[key]);
      return itemsAsArray.filter(x => !x.complete).length;
    }
    return 0;
  }

}

import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoList} from '../../model/todo-list';
import {TodoServiceProvider} from '../../services/todo-service';
import {TodoItem, TodoItemFactory} from '../../model/todo-item';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';
import {SharedAlertProvider} from '../../providers/shared-alert-service/shared-alert';
import {ListSharingProvider} from '../../providers/list-sharing/list-sharing';

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

  private todoListUUid = '';
  private todoListName = 'TodoListName';
  private sharedTodoListURL = '';

  private todos: TodoItem[];


  ngOnInit(): void {
    this.todoListUUid = this.params.get('idListe');
    this.todoListName = this.params.get('listName');

    this.sharedTodoListURL = null != this.params.get('listURL') ?
      this.params.get('listURL') : '';

    if (this.isSharedList()) {
      this.listSharingProvider.getTodoItemsByListURLAsObservable(this.sharedTodoListURL).subscribe(x => {
        this.todos = x;
      });
    }
    else {
      this.todoListService.getTodoItemsAsObservable(this.todoListUUid).subscribe(x => {
        this.todos = x;
      });
    }

  }

  private isSharedList() {
    return '' !== this.sharedTodoListURL;
  }

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public params: NavParams,
              public listSharingProvider: ListSharingProvider,
              public todoListService: TodoServiceProviderFireBase,
              public sharedAlertProvider: SharedAlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

  deleteItem(todoItem: TodoItem) {

    return this.sharedAlertProvider
      .buildConfirmationAlert()
      .withTitle('Confirmation de suppression')
      .withMessage('Veuillez confirmer la suppression de l item ?')
      .withOnOkHandler(() => this.todoListService.deleteTodo(this.todoListUUid, todoItem.uuid))
      .build()
      .present();

  }


  addOrEditItem(todoItem?, item?) {

    // TODO: Look How to avoir null using NullObjectPattern on Typescript
    let prompt = null;

    // Modification d'un Item
    if (undefined !== todoItem) {

      prompt = this.sharedAlertProvider
        .buildPromptAlert()
        .withTitle('Modification de l\'Item')
        .withMessage('Veuillez entrer les informations de l\'Item')
        .withInputs([{
          name: 'name',
          placeholder: 'name',
          value: todoItem.name,
        }])
        .withOnOkHandler(data => {
          todoItem.name = data.name;
          this.todoListService.updateTodo(this.todoListUUid, todoItem)
          item.close();
        })
        .withOnCancelHandler(data => {
          item.close();
        })
        .build();
    } else {
      // Creation d'un nouveau Item
      prompt = this.sharedAlertProvider
        .buildPromptAlert()
        .withTitle('Ajouter un nouveau Item')
        .withMessage('Veuillez entrer les informations de l\'Item')
        .withInputs([{
          name: 'name',
          placeholder: 'name',
          value: '',
        }])
        .withOnOkHandler(data => {
          this.todoListService.createNewTodo(this.todoListUUid, TodoItemFactory.createNewWithName(data.name))
        })
        .withOnCancelHandler(data => {
        })
        .build();
    }

    prompt.present();
  }

  markItemAsCompleted(todoItem: TodoItem) {


    if (this.isSharedList()) {
      this.listSharingProvider.updateTodoByListURL(this.sharedTodoListURL, todoItem);
    }
    else {
      this.todoListService.updateTodo(this.todoListUUid, todoItem);
    }



  }

}

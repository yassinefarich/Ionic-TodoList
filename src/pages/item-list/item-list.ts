import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoItem} from '../../model/todo-item';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';
import {SharedAlertProvider} from '../../providers/shared-alert-service/shared-alert';
import {ListSharingProvider} from '../../providers/list-sharing/list-sharing';
import {ItemEditorPage} from '../item-editor/item-editor';
import {ImageProvider} from '../../providers/image/image';

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

  private todoItemsAndImagesURL = new Map();

  private todos: TodoItem[];


  ngOnInit(): void {

    this.todoListUUid = this.params.get('idListe');
    this.todoListName = this.params.get('listName');

    this.sharedTodoListURL = null != this.params.get('listURL') ?
      this.params.get('listURL') : '';

    if (this.isSharedList()) {
      this.listSharingProvider.getTodoItemsByListURLAsObservable(this.sharedTodoListURL).subscribe(x => {
        this.todos = x;
        this.refreshImages();

      });
    }
    else {
      this.todoListService.getTodoItemsAsObservable(this.todoListUUid).subscribe(x => {
        this.todos = x;
        this.refreshImages();
      });
    }

  }

  private isSharedList() {
    return '' !== this.sharedTodoListURL;
  }

  constructor(private navCtrl: NavController,
              private params: NavParams,
              private listSharingProvider: ListSharingProvider,
              private todoListService: TodoServiceProviderFireBase,
              private sharedAlertProvider: SharedAlertProvider,
              private actionSheetCtrl: ActionSheetController,
              private imageProvider: ImageProvider) {
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


  addOrEditItem(todoItem?, selectionItem?) {

    this.navCtrl.push(ItemEditorPage, {
      'todoItem': todoItem,
      'todoListUUid': this.todoListUUid,
      'todoListUrl': this.sharedTodoListURL,

    });

    if (undefined !== selectionItem) selectionItem.close();
  }

  markItemAsCompleted(todoItem: TodoItem) {

    if (this.isSharedList()) {
      this.listSharingProvider.updateTodoByListURL(this.sharedTodoListURL, todoItem);
    }
    else {
      this.todoListService.updateTodo(this.todoListUUid, todoItem);
    }
  }


  itemActions(todoItem: TodoItem) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action sur l\'item',
      buttons: [
        {
          text: todoItem.complete ? 'Non Complet' : 'Complet',//Achevée
          handler: () => {
            todoItem.complete = !todoItem.complete;
            this.markItemAsCompleted(todoItem);
          }
        }, {
          text: 'Modifier',
          handler: () => {
            this.addOrEditItem(todoItem)
          }
        }, {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.deleteItem(todoItem);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private refreshImages() {
    this.todos.forEach(x => {
      this.imageProvider.getImage(this.todoListUUid, x.uuid ,this.sharedTodoListURL)
        .then(url => x.imageURL = url)
        .catch(x => x.imageURL = '');
    });
  }

}

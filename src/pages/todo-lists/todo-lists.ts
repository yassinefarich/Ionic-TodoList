import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TodoList} from '../../model/todo-list';
import {TodoServiceProvider} from '../../services/todo-service';
import {ItemListPage} from '../item-list/item-list';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';
import {TodoItem} from '../../model/todo-item';
import {SharedAlertProvider} from '../../providers/shared-alert-service/shared-alert';
import {SharePage} from '../share/share';
import {ListSharingProvider} from '../../providers/list-sharing/list-sharing';

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
  private listChoice = 'personal' ;
  private sharedTodoLists = new Array();

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private listSharingProvider: ListSharingProvider,
              private todoListService: TodoServiceProviderFireBase,
              private sharedAlertProvider: SharedAlertProvider) {
  }

  ngOnInit(): void {
    this.todoListService.getList().subscribe(x => {
      this.personalTodoLists = x;
    });
    // TODO : If you have time , take a look on the instructions below
    this.listSharingProvider.getSharedList().subscribe(x => {

      let index = this.sharedTodoLists.findIndex(d => d[0] === x[0]);
      console.log(index)
      if(index >= 0)
      {
        this.sharedTodoLists[index] = x ;
      }
      else {
        this.sharedTodoLists.push(x);
      }
      //this.sharedTodoLists = this.sharedTodoLists.filter(d => d[0] !== x[0]);

    });
  }

  itemSelected(todoList: TodoList) {
    this.navCtrl.push(ItemListPage, {'idListe': todoList.uuid, 'listName': todoList.name});
  }

  itemSelectedSharedList(todoList: [string, TodoList]) {
    this.navCtrl.push(ItemListPage, {
      'idListe': todoList[1].uuid,
      'listName': todoList[1].name,
      'listURL': todoList[0]
    });
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

  shareTodoList(todoList) {
    let modal = this.modalCtrl.create(SharePage, {'todoList': todoList});
    modal.present();

  }

  numberOfUncompletedTodos(todoList: TodoList): number {
    if (undefined !== todoList.items) {
      const itemsAsArray: TodoItem[] = Object.keys(todoList.items)
        .map(key => todoList.items[key]);
      return itemsAsArray.filter(x => !x.complete).length;
    }
    return 0;
  }

}

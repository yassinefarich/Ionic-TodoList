import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TodoList} from '../../model/todo-list';
import {TodoServiceProvider} from '../../services/todo-service';
import {ItemListPage} from '../item-list/item-list';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';
import {TodoItem} from '../../model/todo-item';
import {SharedAlertProvider} from '../../providers/shared-alert-service/shared-alert';
import {SharePage} from '../share/share';

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
  private sharedTodoLists: [string, TodoList][] = new Array();

  ngOnInit(): void {
    this.todoListService.getList().subscribe(x => {
      this.personalTodoLists = x;
    });

    this.todoListService.getSharedList().subscribe(x => {
      console.log(x)
      //this.sharedTodoLists.splice(0,this.sharedTodoLists.length);

      while(this.sharedTodoLists.length > 0) {
        this.sharedTodoLists.pop();
      }

      if (null !== x && null !== x[1])
        x[1].subscribe(y => {
          if (null !== y)  this.sharedTodoLists.push([x,y]);
        })
      //x.subscribe(
      //  y => this.sharedTodoLists = y
      //)//Correct this line pllzz
      //this.sharedTodoLists.push(x);
    });
  }

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              private todoListService: TodoServiceProviderFireBase,
              private sharedAlertProvider: SharedAlertProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListsPage');
  }

  itemSelected(todoList: TodoList) {
    this.navCtrl.push(ItemListPage, {'idListe': todoList.uuid, 'listName': todoList.name});
  }

  itemSelectedSharedList(todoList: [string, TodoList]) {
    this.navCtrl.push(ItemListPage, {
      'idListe': todoList[1].uuid,
      'listName': todoList[1].name,
      'listURL': todoList[0][0]
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
    // let prompt = this.sharedAlertProvider
    //   .buildPromptAlert()
    //   .withTitle('Partager la liste avec ')
    //   .withMessage('Veuillez entrer l\'email')
    //   .withInputs([{
    //     name: 'email',
    //     type:'text',
    //     placeholder: 'email',
    //     value: '',
    //   },{
    //       type: 'checkbox',
    //       label: 'Cree une copie',
    //       value: 'createCopy',
    //       checked: false
    //     }
    //   ])
    //   .withOnOkHandler(data => {
    //     this.todoListService.shareListWith(todoList, data.email);
    //   })
    //   .withOnCancelHandler(data => {
    //
    //   })
    //   .build()
    //   .present();

    let modal = this.modalCtrl.create(SharePage, {'todoList': todoList});
    modal.present();

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

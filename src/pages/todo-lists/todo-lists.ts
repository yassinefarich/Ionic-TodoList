import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, LoadingController, ModalController, NavController,
  NavParams
} from 'ionic-angular';
import {TodoList} from '../../model/todo-list';
import {TodoServiceProvider} from '../../services/todo-service';
import {ItemListPage} from '../item-list/item-list';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';
import {TodoItem} from '../../model/todo-item';
import {SharedAlertProvider} from '../../providers/shared-alert-service/shared-alert';
import {SharePage} from '../share/share';
import {ListSharingProvider} from '../../providers/list-sharing/list-sharing';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {notNullAndNotUndefined} from '../../providers/Utils';
import {LoginPage} from '../login/login';

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

  private listChoice = 'personal';
  private sharedTodoLists = new Array();
  private myListsfilter: string = '';
  private loader: any;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private listSharingProvider: ListSharingProvider,
              private todoListService: TodoServiceProviderFireBase,
              private sharedAlertProvider: SharedAlertProvider,
              private barcodeScanner: BarcodeScanner,
              private actionSheetCtrl: ActionSheetController,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    this.showLoadingIndicator();

    this.todoListService.getList().subscribe(x => {
      this.personalTodoLists = x;
      this.loader.dismiss();
    });
    // TODO : If you have time , take a look on the instructions below
    this.listSharingProvider.getSharedList().subscribe(x => {

      let index = this.sharedTodoLists.findIndex(d => d.url === x.url);
      if (index >= 0) {
        this.sharedTodoLists[index] = x;
      }
      else {
        this.sharedTodoLists.push(x);
      }

    });
  }

  itemSelected(todoList: TodoList) {
    this.navCtrl.push(ItemListPage, {'idListe': todoList.uuid, 'listName': todoList.name});
  }

  itemSelectedSharedList(todoList) {
    this.navCtrl.push(ItemListPage, {
      'idListe': todoList.list.uuid,
      'listName': todoList.list.name,
      'listURL': todoList.url
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

          if (notNullAndNotUndefined(item)) item.close();
        })
        .withOnCancelHandler(data => {
          if (notNullAndNotUndefined(item)) item.close();
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

    if (null === todoList.uuid || '' === todoList.uuid) {
      alert("Cannot delete this list !! no uuid")
      return;
    }

    this.sharedAlertProvider
      .buildConfirmationAlert()
      .withTitle('Confirmation de suppression')
      .withMessage('Veuillez confirmer la suppression de la liste ?')
      .withOnOkHandler(() => this.todoListService.deleteTodoList(todoList))
      .build()
      .present();
  }


  todoListActions(todoList: TodoList) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Modifier',
          handler: () => {
            this.addOrEditTodoList(todoList);
          }
        }, {
          text: 'Partager',
          handler: () => {
            this.shareTodoList(todoList);
          }
        },
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.deleteList(todoList);
          }
        },
        {
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


  showQRCodeScanner() {

    this.barcodeScanner.scan().then((barcodeData) => {
      this.listSharingProvider.shareListWithCurrentUser(barcodeData.text);

      this.sharedAlertProvider
        .buildConfirmationAlert()
        .withTitle('Liste partagée')
        .withMessage('Une liste partagée a été ajoutée ')
        .withOnOkHandler(() => {
        })
        .buildWithOneButton()
        .present();

    }, (err) => {

      alert(err.toString())
    });

  }

  deleteSharedList(sharedList) {
    this.sharedAlertProvider
      .buildConfirmationAlert()
      .withTitle('Confirmation de suppression')
      .withMessage('Veuillez confirmer la suppression du partage de la liste ?')
      .withOnOkHandler(() => {
        this.listSharingProvider.deleteSharedList(sharedList.list.uuid);
        this.sharedTodoLists = this.sharedTodoLists.filter(x => x.url !== sharedList.url)
      })
      .build()
      .present();
  }

  showLoadingIndicator() {
    this.loader = this.loadingCtrl.create({
      content: "Chargement...",
      duration: 15000
    });

    this.loader.present();
  }

  showMyProfilePage(){
    this.navCtrl.push(LoginPage);
  }

}

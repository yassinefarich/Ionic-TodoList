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
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';

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

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private listSharingProvider: ListSharingProvider,
              private todoListService: TodoServiceProviderFireBase,
              private sharedAlertProvider: SharedAlertProvider,
              private qrScanner: QRScanner) {
  }

  ngOnInit(): void {
    this.todoListService.getList().subscribe(x => {
      this.personalTodoLists = x;
    });
    // TODO : If you have time , take a look on the instructions below
    this.listSharingProvider.getSharedList().subscribe(x => {

      let index = this.sharedTodoLists.findIndex(d => d[0] === x[0]);
      console.log(index)
      if (index >= 0) {
        this.sharedTodoLists[index] = x;
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

  showQRCodeScanner() {
    this.scanCode();
  }


  scanCode() {
    var context = this;
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {

        if (status.authorized) {
          // camera permission was granted
          console.log("scanning");
          var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
          alert("Hello");
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((scannedAddress: string) => {
            console.log('Scanned address', scannedAddress);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            ionApp.style.display = "block";
          });

          // show camera preview
          ionApp.style.display = "none";
          context.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          console.log("Denied permission to access camera");
        } else {
          console.log("Something else is happening with the camera");
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  scanCode2() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {

          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
            alert(text);
            this.qrScanner.hide(); // hide camera preview
            this.qrScanner.destroy();
            scanSub.unsubscribe(); // stop scanning

          });

          // show camera preview
          this.qrScanner.show();


        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));

  }


}

import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {ListSharingProvider} from '../../providers/list-sharing/list-sharing';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage implements OnInit {

  private todoList;
  private email: string = '';
  private createCopy: boolean = false;

  createdCode = null;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private listSharingProvider: ListSharingProvider) {
    this.todoList = navParams.get('todoList');
  }

  ngOnInit(): void {
    this.createdCode = this.listSharingProvider.getListPath(this.todoList, this.email);
    console.log(this.createdCode);
  }

  shareTodoList() {

    if (this.createCopy) {
      this.listSharingProvider.shareListWithCreateCopy(this.todoList, this.email);
    }
    else {
      this.listSharingProvider.shareList(this.todoList, this.email);
    }
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

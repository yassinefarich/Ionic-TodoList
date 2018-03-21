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
              private listSharingProvider: ListSharingProvider,
              private qrScanner: QRScanner) {
    this.todoList = navParams.get('todoList');
  }

  ngOnInit(): void {
    this.createdCode = this.listSharingProvider.getListPath(this.todoList, this.email);
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


  scanCode() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

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

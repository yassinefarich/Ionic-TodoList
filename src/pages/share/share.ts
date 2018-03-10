import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {ListSharingProvider} from '../../providers/list-sharing/list-sharing';

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
export class SharePage {


  private todoList;
  private email: string = '';
  private createCopy: boolean = false;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private listSharingProvider: ListSharingProvider) {
    this.todoList = navParams.get('todoList');
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

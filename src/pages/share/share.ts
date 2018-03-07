import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';

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
  private email : string = '';
  private createCopy : boolean = false;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,private todoListService: TodoServiceProviderFireBase,) {
    this.todoList = navParams.get('todoList');
  }


  shareTodoList()
  {

    if(this.createCopy)
    {
      this.todoListService.shareListWithCreateCopy(this.todoList, this.email);
    }
    else {
      this.todoListService.shareListWith(this.todoList, this.email);
    }
    this.dismiss();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage'+this.todoList.uuid);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }


}

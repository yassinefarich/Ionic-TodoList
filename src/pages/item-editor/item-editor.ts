import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ImageProvider} from '../../providers/image/image';


/**
 * Generated class for the ItemEditorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-editor',
  templateUrl: 'item-editor.html',
})
export class ItemEditorPage {


  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditorPage');
  }

  selectImage()
  {

    //this.imageProvide.selectImage();

  }





}

import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {ImageProvider} from '../../providers/image/image';
import {DomSanitizer} from '@angular/platform-browser';
import {TodoItem, TodoItemFactory} from '../../model/todo-item';
import {TodoServiceProviderFireBase} from '../../providers/todo-service/todo-service-firebase';
import {generateUUID, notNullAndNotUndefined} from '../../providers/Utils';
import {ListSharingProvider} from "../../providers/list-sharing/list-sharing";

import * as firebase from 'firebase/app';
import {ItemListPage} from '../item-list/item-list';
import {GeolocProvider} from '../../providers/geoloc/geoloc';


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
export class ItemEditorPage implements OnInit {

  parentPage: ItemListPage = null;

  todoItem: TodoItem = null;
  listUUID = 'LIST_NULL';
  isCreateOperation = true;
  todoListUrl = '';

  appIsRunningOnWebBrowser = true;
  selectedImage: string = ''
  selectedImageSafeURLPreview = null
  imageFile: File = null;
  imageFromGoogleMap = false;


  constructor(public navCtrl: NavController,
              public params: NavParams,
              private imageProvider: ImageProvider,
              public todoListService: TodoServiceProviderFireBase,
              public platform: Platform, private domSanitizer: DomSanitizer,
              private listSharingProvide: ListSharingProvider,
              private geolocation: GeolocProvider,
              public alertCtrl: AlertController) {
  }

  ngOnInit(): void {

    this.appIsRunningOnWebBrowser = this.platform.is('core') || this.platform.is('mobileweb');
    this.todoItem = this.params.get('todoItem');
    this.isCreateOperation = !notNullAndNotUndefined(this.todoItem);

    this.todoItem = this.isCreateOperation ? TodoItemFactory.createNewEmpty() : this.todoItem;
    this.listUUID = this.params.get('todoListUUid');
    this.todoListUrl = this.params.get('todoListUrl');
    this.parentPage = this.params.get('parentPage');

    this.refreshImage();

  }

  public selectImage(event?: any) {

    if (this.appIsRunningOnWebBrowser) {
      this.selectImageFromWebBrowser(event.target.files);
      return;
    }

    this.imageProvider.selectImage().then(x => {
        this.selectedImage = x
        this.selectedImageSafeURLPreview = this.domSanitizer.bypassSecurityTrustUrl(x)
      }
    );
  }

  private selectImageFromWebBrowser(selectedFiles) {
    this.imageFile = selectedFiles[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.selectedImageSafeURLPreview = this.domSanitizer.bypassSecurityTrustUrl(myReader.result);
    }
    myReader.readAsDataURL(this.imageFile);
  }


  saveItem() {
    let promiseSaveOrUpdate: Promise<any>;
    if (this.isCreateOperation) {
      this.todoItem.uuid = generateUUID();

      promiseSaveOrUpdate = '' === this.todoListUrl ? this.todoListService.createNewTodo(this.listUUID, this.todoItem) :
        this.listSharingProvide.createTodoByListURL(this.todoListUrl, this.todoItem);

    }
    else {

      promiseSaveOrUpdate = '' === this.todoListUrl ? this.todoListService.updateTodo(this.listUUID, this.todoItem) :
        this.listSharingProvide.updateTodoByListURL(this.todoListUrl, this.todoItem);
    }

    promiseSaveOrUpdate.then(x => this.uploadImage());

    this.navCtrl.pop();
  }


  refreshImage() {
    this.imageProvider.getImage(this.listUUID, this.todoItem.uuid, this.todoListUrl)
      .then(url => this.selectedImageSafeURLPreview = url,
        error => console.log("No image found for the item ", this.todoItem.uuid))
      .catch(error => console.log("No image found for the item ", this.todoItem.uuid))
  }


  uploadImage() {

    if (this.imageFromGoogleMap) {
      let googleImageURL = this.selectedImageSafeURLPreview;
      this.imageProvider.getBase64ImageFromUrl(googleImageURL)
        .subscribe(x => {
          this.selectedImage = x

          this.imageProvider.uploadImageFromMobile(this.selectedImage, this.listUUID, this.todoItem.uuid, this.todoListUrl)
          this.imageFromGoogleMap = false;
        })
    }


    if (this.appIsRunningOnWebBrowser && notNullAndNotUndefined(this.imageFile)) {

      this.imageProvider.uploadImageFromWebBrowser(this.imageFile, this.listUUID, this.todoItem.uuid, this.todoListUrl)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
          },
          (error) => {
            console.log(error)
          },
          () => {
            this.parentPage.refreshImages();
          }
        );

      return;
    }

    if (!this.appIsRunningOnWebBrowser && notNullAndNotUndefined(this.selectedImage)) {
      this.imageProvider.uploadImageFromMobile(this.selectedImage, this.listUUID, this.todoItem.uuid, this.todoListUrl)
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEditorPage');
  }

//TODO : Add this alert to AlertBuilder if you have Time
  public showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Ajout d\'information geographique');

    alert.addInput({
      type: 'checkbox',
      label: 'Address dans la description',
      value: 'descAdrss',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Map dans l\'image',
      value: 'imageMap'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        if (data.indexOf('descAdrss') > -1) {
          this.putAddressOnDescription()
        }

        if (data.indexOf('imageMap') > -1) {
          this.putAddressOnImage();
        }

      }
    });
    alert.present();
  }

  putAddressOnDescription() {
    this.geolocation.findMyCurrentAddress(x => {

      if ('OK' === x.status) {
        let wellPrintedAddress = x.results[0].formatted_address;
        this.todoItem.desc = (notNullAndNotUndefined(this.todoItem.desc) ? this.todoItem.desc : '')
          + `Adresse : ${wellPrintedAddress}`;
      }
      else {
        alert("Cannot get address .")
      }

    });
  }


  putAddressOnImage() {

    this.geolocation.getGoogleMapImageOfMyLocation().subscribe(
      url => {
        console.log(url)
        this.selectedImageSafeURLPreview = url
        this.imageFromGoogleMap = true;
      }
    )
  }


}

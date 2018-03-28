import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import {ToDoAppGoogleAuthProvider} from '../google-auth/google-auth';
import {notNullAndNotUndefined} from '../Utils';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class ImageProvider {

  private cameraImage: string

  constructor(private camera: Camera, private authProvider: ToDoAppGoogleAuthProvider) {
    console.log('Hello ImageProvider Provider');
  }


  selectImage(): Promise<any> {
    return new Promise(resolve => {
      let cameraOptions: CameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100,
        targetWidth: 320,
        targetHeight: 240,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      };

      this.camera.getPicture(cameraOptions)
        .then((data) => {
          this.cameraImage = "data:image/jpeg;base64," + data;
          resolve(this.cameraImage);
        });
    });
  }

  public getSelectedBase64Image(): string {
    return this.cameraImage;
  }


  uploadImageFromWebBrowser(image: File, listId: string, itemId: string, listURL?: string): any {

    let imageRef = this.forgeImageRef(listId, itemId, listURL);
    let uploadTask = imageRef.put(image);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        alert("The image has benn uploaded :)")
        // upload success
      }
    );

  }

  uploadImageFromMobile(image: string, listId: string, itemId: string, listURL?: string): any {
    let imageRef = this.forgeImageRef(listId, itemId, listURL);
    return imageRef.putString(image, 'data_url');
  }

  getImage(listId: string, itemId: string, listURL: string): Promise<any> {
    return this.forgeImageRef(listId, itemId, listURL).getDownloadURL()
  }

  private forgeImageRef(listId: string, itemId: string, listURL?: string) {

    let storageRef = firebase.storage().ref();
    if (notNullAndNotUndefined(listURL) && '' !== listURL) {
      return storageRef.child(`${listURL}/${itemId}.jpg`);
    }

    let userID = this.authProvider.getUserID();
    return storageRef.child(`images/${userID}/${listId}/${itemId}.jpg`);

  }

}

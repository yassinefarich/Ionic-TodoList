import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import {ToDoAppGoogleAuthProvider} from '../google-auth/google-auth';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class ImageProvider {

  private cameraImage: string

  constructor(private camera: Camera , private authProvider: ToDoAppGoogleAuthProvider) {
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


  uploadImageFromWebBrowser(image: File, listId: string, itemId: string): any {

    let imageRef = this.forgeImageRef(listId, itemId);
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

  uploadImageFromMobile(image: string, listId: string, itemId: string): any {
    let imageRef = this.forgeImageRef(listId, itemId);
    return imageRef.putString(image, 'data_url');
  }

  private forgeImageRef(listId: string, itemId: string) {
    let storageRef = firebase.storage().ref();
    let userID = this.authProvider.getUserID() ;
    alert(userID)
    return storageRef.child(`${userID}/images/${listId}/${itemId}.jpg`);
  }


  getImage(listId: string, itemId: string) {
    let storageRef = firebase.storage().ref();
    let userID = this.authProvider.getUserID() ;
    let imageRef = storageRef.child(`${userID}/images/${listId}/${itemId}.jpg`);
    return imageRef.getDownloadURL();
  }

  // getImage(userId: string, photoId: string): any {
  //   let storageRef = firebase.storage().ref();
  //   let imageRef = storageRef.child(`${userId}/${photoId}`);
  //   return imageRef.getDownloadURL();
  // }


}

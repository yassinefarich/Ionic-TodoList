import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import {ToDoAppGoogleAuthProvider} from '../google-auth/google-auth';
import {notNullAndNotUndefined} from '../Utils';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseContentType} from '@angular/http';
import {Subject} from 'rxjs/Subject';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class ImageProvider {

  private cameraImage: string

  constructor(private camera: Camera, private authProvider: ToDoAppGoogleAuthProvider , public http: HttpClient) {
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
    return imageRef.put(image);
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
    let userID = this.authProvider.getUserID();

    let imagePath = notNullAndNotUndefined(listURL) && '' !== listURL ? `images/${listURL}/${itemId}.jpg` :
      `images/${userID}//personal_lists/${listId}/${itemId}.jpg`

    return storageRef.child(imagePath);

  }

  public getBase64ImageFromUrl(imageUrl) {

    let resultSubject: Subject<string> = new Subject()

    this.http.get(imageUrl, {responseType: 'blob'}).subscribe(x => {
        let result = '';
        var reader = new FileReader();
        reader.readAsDataURL(x);
        reader.onloadend = function () {
          result = reader.result;
          resultSubject.next(result);

        }
      }
    )

    return resultSubject;

  }

}

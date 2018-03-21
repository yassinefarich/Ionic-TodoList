import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  public cameraImage : string

  constructor(public navCtrl: NavController, public navParams: NavParams , private camera : Camera,private angularFireDatabase: AngularFireDatabase) {
    console.log('Hello ImageProvider Provider');
  }

  selectImage() : Promise<any>
  {
    return new Promise(resolve =>
    {
      let cameraOptions : CameraOptions = {
        sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType    : this.camera.DestinationType.DATA_URL,
        quality            : 100,
        targetWidth        : 320,
        targetHeight       : 240,
        encodingType       : this.camera.EncodingType.JPEG,
        correctOrientation : true
      };

      this.camera.getPicture(cameraOptions)
        .then((data) =>
        {
          this.cameraImage 	= "data:image/jpeg;base64," + data;
          alert(this.cameraImage)

          this.uploadImage(this.cameraImage,'im1','im2').then(x => {
            alert(x)
          }, err => {
            alert(JSON.stringify(err))
          })
          resolve(this.cameraImage);
        });


    });
  }

  uploadImage(image: string, userId: string, photoId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${photoId}.jpg`);
    return imageRef.putString(image, 'data_url');
  }

  getImage(userId: string, photoId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${photoId}`);
    return imageRef.getDownloadURL();
  }


}

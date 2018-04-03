import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {
  GOOGLE_GEOCODING_API_KEY, GOOGLE_GEOCODING_API_URL,
  GOOGLE_MAP_IMAGE_API_URL
} from '../../thirdParty-services-settings';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


function forgeGeoCodingURL(baseURL : string ,latitude: number, longitude: number) {



  return baseURL
    .replace(/{latitude}/gi, latitude.toString())
    .replace(/{longitude}/gi, longitude.toString())
    .replace(/{api_key}/gi, GOOGLE_GEOCODING_API_KEY);
}

/*
  Generated class for the GeolocProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocProvider {

  respSubject: Subject<string> = new Subject()

  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello GeolocProvider Provider');
  }

  public getGoogleMapImageOfMyLocation(): Observable<string> {


    this.geolocation.getCurrentPosition().then((resp) => {

      let mapURL = forgeGeoCodingURL(GOOGLE_MAP_IMAGE_API_URL, resp.coords.latitude, resp.coords.longitude);
     console.log(mapURL)
      this.respSubject.next(mapURL)
    }).catch((error) => {

    });

    return this.respSubject;
  }

  public findMyCurrentAddress(callback: any) {
    this.geolocation.getCurrentPosition().then((resp) => {

      console.log("Your location is : " + resp.coords.latitude + " ," + resp.coords.longitude)
      this.resolveAddressFromGeoCoordinates(resp.coords.latitude, resp.coords.longitude, callback);

    }).catch((error) => {
      console.log('Error getting location', error);
      alert("Impossible d'avoir les coordonnées GPS")
    });
  }

  private resolveAddressFromGeoCoordinates(latitude: number, longitude: number, callback: any) {
    this.http.get(forgeGeoCodingURL(GOOGLE_GEOCODING_API_URL, latitude, longitude)).subscribe(callback);
  }

}

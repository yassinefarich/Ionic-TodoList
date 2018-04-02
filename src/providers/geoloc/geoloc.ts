import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {GOOGLE_GEOCODING_API_KEY, GOOGLE_GEOCODING_API_URL} from '../../thirdParty-services-settings';


function forgeGeoCodingURL(latitude: number, longitude: number) {
  return GOOGLE_GEOCODING_API_URL
    .replace('{latitude}', latitude.toString())
    .replace('{longitude}', longitude.toString())
    .replace('{api_key}', GOOGLE_GEOCODING_API_KEY);
}

/*
  Generated class for the GeolocProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocProvider {

  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello GeolocProvider Provider');
  }

  public findMyCurrentAddress(callback: any) {
    this.geolocation.getCurrentPosition().then((resp) => {

      console.log("Your location is : " + resp.coords.latitude + " ," + resp.coords.longitude)
      this.resolveAddressFromGeoCoordinates(resp.coords.latitude, resp.coords.longitude, callback);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  private resolveAddressFromGeoCoordinates(latitude: number, longitude: number, callback: any) {
    this.http.get(forgeGeoCodingURL(latitude, longitude)).subscribe(callback);
  }

}

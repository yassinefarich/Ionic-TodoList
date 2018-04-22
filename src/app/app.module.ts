import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TodoServiceProvider} from '../services/todo-service';
import {ItemListPageModule} from '../pages/item-list/item-list.module';
import {TodoListsPageModule} from '../pages/todo-lists/todo-lists.module';
import {AngularFireModule, FirebaseApp} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {LoginPageModule} from '../pages/login/login.module';
import {GooglePlus} from '@ionic-native/google-plus';
import {TodoServiceProviderFireBase} from '../providers/todo-service/todo-service-firebase';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {ToDoAppGoogleAuthProvider} from '../providers/google-auth/google-auth';
import {GooglePlusAuthProvider} from '../providers/google-auth/google-plus-auth';
import {GoogleWebAuthProvider} from '../providers/google-auth/google-web-auth';
import {
  ConfirmationAlertBuilder,
  PromptAlertBuilder,
  SharedAlertProvider
} from '../providers/shared-alert-service/shared-alert';
import {SharePageModule} from '../pages/share/share.module';
import {ListSharingProvider} from '../providers/list-sharing/list-sharing';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {QRScanner} from '@ionic-native/qr-scanner';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {ItemEditorPageModule} from '../pages/item-editor/item-editor.module';
import {Camera} from '@ionic-native/camera';
import { ImageProvider } from '../providers/image/image';
import {PipesModule} from '../pipes/pipes.module';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocProvider } from '../providers/geoloc/geoloc';
import {HttpClientModule} from '@angular/common/http';
import {FIREBASE_CONFIG} from '../thirdParty-services-settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    ItemListPageModule,
    TodoListsPageModule,
    LoginPageModule,
    SharePageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    NgxQRCodeModule,
    ItemEditorPageModule,
    PipesModule,
    HttpClientModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TodoServiceProvider,
    TodoServiceProviderFireBase,
    AngularFireAuth,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlusAuthProvider,
    GoogleWebAuthProvider,
    SharedAlertProvider,
    ToDoAppGoogleAuthProvider,
    ConfirmationAlertBuilder,
    PromptAlertBuilder,
    ListSharingProvider,
    QRScanner,
    BarcodeScanner,
    Camera,
    ImageProvider,
    Geolocation,
    GeolocProvider
  ]
})
export class AppModule {
  private static AngularFireDatabaseModle: any;
}

import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TodoServiceProvider} from '../services/todo-service';
import {ItemListPageModule} from '../pages/item-list/item-list.module';
import {TodoListsPageModule} from '../pages/todo-lists/todo-lists.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {LoginPageModule} from '../pages/login/login.module';
import {GooglePlus} from '@ionic-native/google-plus';
import {TodoServiceProviderFireBase} from '../providers/todo-service/todo-service-firebase';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {WebAuthPageModule} from '../pages/web-auth/simple-auth.module';
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
import {FIREBASE_CONFIG} from '../fireBase-Settings';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    ItemListPageModule,
    TodoListsPageModule,
    LoginPageModule,
    WebAuthPageModule,
    SharePageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    NgxQRCodeModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
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
  ]
})
export class AppModule {
  private static AngularFireDatabaseModle: any;
}

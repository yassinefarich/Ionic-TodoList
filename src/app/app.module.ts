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
import { GooglePlus } from '@ionic-native/google-plus';
import {TodoServiceProviderFireBase} from '../providers/todo-service/todo-service-firebase';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import {WebAuthPage} from '../pages/web-auth/simple-auth';
import {WebAuthPageModule} from '../pages/web-auth/simple-auth.module';
import {AngularFireAuth} from 'angularfire2/auth';
import { ToDoAppGoogleAuthProvider } from '../providers/google-auth/google-auth';
import {GooglePlusAuthProvider} from '../providers/google-auth/google-plus-auth';
import {GoogleWebAuthProvider} from '../providers/google-auth/google-web-auth';
import {
  ConfirmationAlertBuilder, PromptAlertBuilder,
  SharedAlertProvider
} from '../providers/shared-alert-service/shared-alert';
import {SharePage} from '../pages/share/share';
import {SharePageModule} from '../pages/share/share.module';
import { ListSharingProvider } from '../providers/list-sharing/list-sharing';


// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDCVtCiTEb2wB-hkzbe9ofisTypLIbz7m0",
  authDomain: "todolist-6374b.firebaseapp.com",
  databaseURL: "https://todolist-6374b.firebaseio.com",
  projectId: "todolist-6374b",
  storageBucket: "todolist-6374b.appspot.com",
  messagingSenderId: "143451751699"
};


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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence()

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
  ]
})
export class AppModule {
  private static AngularFireDatabaseModle: any;
}

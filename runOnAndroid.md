## Commands cheatSheet 

### Run On android

    export PATH=${PATH}:/media/farich/7C2C00612C0018B2/Android/Sdk/platform-tools:/media/farich/7C2C00612C0018B2/Android/Sdk/tools

    ionic cordova run android

    cordova run android --device

    cordova emulate android

### Google Auth commands
    Get SHA-1 hash :
        keytool -exportcert -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore -J-Duser.language=en 

    Add Cordova Plug-in :
        cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=myreversedclientid


    cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.143451751699-i0l7oqlottrluaaol7cdqudbcb531m12

    Install IonicNativeGoogle Plus :
        npm install --save @ionic-native/google-plus



-------------------------------



  <ion-list no-lines>

    <button ion-item *ngFor="let todoList of todoLists" (click)="itemSelected(todoList)">
      {{ todoList.name }} ({{todoList.items.length}})
    </button>
  </ion-list>


### Env Variables :
    ANDROID_HOME=/media/farich/7C2C00612C0018B2/Android/Sdk
    android 
    export PATH=${PATH}:/media/farich/7C2C00612C0018B2/Android/Sdk/platform-tools:/media/farich/7C2C00612C0018B2/Android/Sdk/tools
    source ~/.bash_profile


### Run emulator withows Android Studio
    emulator ./emulator -list-avds
    4.65_720p_Galaxy_Nexus_API_26
    Nexus_5X_API_27

    emulator ./emulator -avd 4.65_720p_Galaxy_Nexus_API_26


    keytool -exportcert -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore -J-Duser.language=en 
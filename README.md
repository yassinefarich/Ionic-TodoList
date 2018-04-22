# Simple TodoList Mobile application 
This is a Simple TodoList projet developped using Ionic3 , firebase and AngularFire2 


### Implemented Features
  
  - Authentication using Google accounts
  - FireBase data Storage
  - Share TodoLists between Users
  - Add Images to TodoItems
  - Geoloc and address resolving  
  - Markdown Support

### Configurations

The configuration of The 3th party services(FireBase , googleMap api) can be configured in the file :

   ``[PROJECT_DIR]/src/thirdParty-services-settings.ts``


### Running the application

#### On the Web browser

```bash
  yarn install
  ionic serve -l
```

#### On android

```bash
  export PATH=${PATH}:[ANDROID_SDK_INSTALL]/Sdk/platform-tools:[ANDROID_SDK_INSTALL]/Sdk/tools
  ionic cordova run android
```

**Note:** using `--livereload` when the application is running on Android blocks some native functionality.

#### Project Clean

```bash
  ionic cordova clean
```


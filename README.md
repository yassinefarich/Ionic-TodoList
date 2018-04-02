### Liste des fonctionnalités implémentées
  
  - Application qui tourne sur mobile
  - SSO avec Google ou Facebook
  - Stockage des données dans firebase
  - Partage de liste
  - Image d'Item
  - Geolocalisation

### Confguartion de l'application

La configuration des services tiers (FireBase et googleMap api) se trouve dans le fichier :

   ``[PROJECT_DIR]/src/thirdParty-services-settings.ts``


### Execution de l'application
#### Execution dans Android

```bash
  export PATH=${PATH}:[ANDROID_SDK_INSTALL]/Sdk/platform-tools:[ANDROID_SDK_INSTALL]/Sdk/tools
  ionic cordova run android
  
```

#### Clean de l'application si erreur de compilation

```bash
  ionic cordova clean
```

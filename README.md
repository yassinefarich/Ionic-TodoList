# Projet Application mobile avec Ionic

> Réalisé par  : Yassine Farich , Chiraz Limayem
>
> Encadré par : Mathieu Roger , Alexandre Demeure


### Liste des fonctionnalités implémentées
  
  - SSO avec Google
  - Stockage des données dans firebase
  - Partage de liste
  - Image d'Item
  - Géolocalisation et determination d'adress
  - Support de Markdown

### Confguartion de l'application

La configuration des services Tiers (FireBase ou googleMap api) se trouve dans le fichier :

   ``[PROJECT_DIR]/src/thirdParty-services-settings.ts``


### Exécution de l'application

#### Exécution en locale (Navigateur WEB)

```bash
  ionic serve -l
```

#### Exécution en android

```bash
  export PATH=${PATH}:[ANDROID_SDK_INSTALL]/Sdk/platform-tools:[ANDROID_SDK_INSTALL]/Sdk/tools
  ionic cordova run android
```

**Attention:** Ne pas utiliser le paramètres `--livereload` , ce paramètre simule une exécution en navigateur ce qui bloque les fonctionnalités natives

#### Clean de l'application si erreur de compilation

```bash
  ionic cordova clean
```


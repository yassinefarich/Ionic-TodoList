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




    TodoListe git:(add_some_new_features) ✗ node_modules/tslint/bin/tslint -c tslint.json 'src/**/*.ts'
typeof-compare is deprecated. Starting from TypeScript 2.2 the compiler includes this check which makes this rule redundant.
Warning: The 'no-use-before-declare' rule requires type information.

ERROR: src/app/app.component.ts[11, 14]: The name of the class MyApp should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/app/app.component.ts[12, 12]: missing whitespace
ERROR: src/app/app.module.ts[36, 11]: " should be '
ERROR: src/app/app.module.ts[37, 15]: " should be '
ERROR: src/app/app.module.ts[38, 16]: " should be '
ERROR: src/app/app.module.ts[39, 14]: " should be '
ERROR: src/app/app.module.ts[40, 18]: " should be '
ERROR: src/app/app.module.ts[41, 22]: " should be '
ERROR: src/model/TodoItem.ts[2, 15]: Properties should be separated by semicolons
ERROR: src/model/TodoItem.ts[3, 15]: Properties should be separated by semicolons
ERROR: src/model/TodoItem.ts[4, 20]: Properties should be separated by semicolons
ERROR: src/model/TodoItem.ts[5, 16]: Properties should be separated by semicolons
ERROR: src/model/TodoItem.ts[10, 56]: Missing semicolon
ERROR: src/model/TodoList.ts[4, 15]: Properties should be separated by semicolons
ERROR: src/model/TodoList.ts[5, 15]: Properties should be separated by semicolons
ERROR: src/model/TodoList.ts[6, 20]: Properties should be separated by semicolons
ERROR: src/model/TodoList.ts[10, 47]: expected nospace before colon in parameter
ERROR: src/model/TodoList.ts[10, 63]: expected nospace before colon in parameter
ERROR: src/model/TodoList.ts[10, 73]: expected nospace before colon in call-signature
ERROR: src/model/TodoList.ts[11, 3]: misplaced opening brace
ERROR: src/pages/about/about.ts[5, 13]: The selector of the component "AboutPage" should have prefix "app" (https://angular.io/styleguide#style-02-07)
ERROR: src/pages/about/about.ts[8, 14]: The name of the class AboutPage should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/pages/about/about.ts[10, 16]: expected nospace before colon in property-declaration
ERROR: src/pages/about/about.ts[11, 1]: trailing whitespace
ERROR: src/pages/contact/contact.ts[5, 13]: The selector of the component "ContactPage" should have prefix "app" (https://angular.io/styleguide#style-02-07)
ERROR: src/pages/contact/contact.ts[8, 14]: The name of the class ContactPage should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/pages/home/home.ts[12, 13]: The selector of the component "HomePage" should have prefix "app" (https://angular.io/styleguide#style-02-07)
ERROR: src/pages/home/home.ts[16, 14]: The name of the class HomePage should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/pages/home/home.ts[23, 17]: " should be '
ERROR: src/pages/home/home.ts[23, 39]: Missing semicolon
ERROR: src/pages/home/home.ts[30, 25]: Missing semicolon
ERROR: src/pages/home/home.ts[31, 7]: Missing semicolon
ERROR: src/pages/item-list/item-list.ts[18, 13]: The selector of the component "ItemListPage" should have prefix "app" (https://angular.io/styleguide#style-02-07)
ERROR: src/pages/item-list/item-list.ts[21, 14]: The name of the class ItemListPage should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/pages/item-list/item-list.ts[23, 25]: Type string trivially inferred from a string literal, remove type annotation
ERROR: src/pages/item-list/item-list.ts[24, 25]: Type string trivially inferred from a string literal, remove type annotation
ERROR: src/pages/item-list/item-list.ts[32, 7]: comment must start with a space
ERROR: src/pages/item-list/item-list.ts[67, 7]: comment must start with a space
ERROR: src/pages/item-list/item-list.ts[70, 7]: comment must start with a space
ERROR: src/pages/item-list/item-list.ts[84, 71]: Missing semicolon
ERROR: src/pages/item-list/item-list.ts[90, 17]: Missing semicolon
ERROR: src/pages/item-list/item-list.ts[92, 7]: comment must start with a space
ERROR: src/pages/item-list/item-list.ts[93, 5]: misplaced 'else'
ERROR: src/pages/item-list/item-list.ts[105, 110]: Missing semicolon
ERROR: src/pages/item-list/item-list.ts[109, 17]: Missing semicolon
ERROR: src/pages/item-list/item-list.ts[119, 65]: Missing semicolon
ERROR: src/pages/login/login.ts[11, 13]: The selector of the component "LoginPage" should have prefix "app" (https://angular.io/styleguide#style-02-07)
ERROR: src/pages/login/login.ts[14, 14]: The name of the class LoginPage should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/pages/login/login.ts[42, 5]: misplaced 'else'
ERROR: src/pages/login/login.ts[59, 3]: misplaced opening brace
ERROR: src/pages/tabs/tabs.ts[14, 14]: The name of the class TabsPage should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/pages/todo-lists/todo-lists.ts[20, 13]: The selector of the component "TodoListsPage" should have prefix "app" (https://angular.io/styleguide#style-02-07)
ERROR: src/pages/todo-lists/todo-lists.ts[23, 14]: The name of the class TodoListsPage should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/pages/todo-lists/todo-lists.ts[29, 25]: Missing semicolon
ERROR: src/pages/todo-lists/todo-lists.ts[30, 7]: Missing semicolon
ERROR: src/pages/todo-lists/todo-lists.ts[69, 17]: Missing semicolon
ERROR: src/pages/todo-lists/todo-lists.ts[71, 5]: misplaced 'else'
ERROR: src/pages/todo-lists/todo-lists.ts[86, 17]: Missing semicolon
ERROR: src/pages/todo-lists/todo-lists.ts[108, 7]: comment must start with a space
ERROR: src/pages/todo-lists/todo-lists.ts[109, 5]: if statements must be braced
ERROR: src/pages/todo-lists/todo-lists.ts[109, 19]: == should be ===
ERROR: src/pages/todo-lists/todo-lists.ts[110, 5]: Forbidden 'var' keyword, use 'let' or 'const' instead
ERROR: src/pages/todo-lists/todo-lists.ts[110, 9]: Identifier 'itemsAsArray' is never reassigned; use 'const' instead of 'var'.
ERROR: src/pages/web-auth/simple-auth.ts[9, 13]: The selector of the component "WebAuthPage" should have prefix "app" (https://angular.io/styleguide#style-02-07)
ERROR: src/pages/web-auth/simple-auth.ts[12, 3]: comment must start with a space
ERROR: src/pages/web-auth/simple-auth.ts[13, 14]: The name of the class WebAuthPage should end with the suffix Component (https://angular.io/styleguide#style-02-03)
ERROR: src/pages/web-auth/simple-auth.ts[20, 16]: missing whitespace
ERROR: src/pages/web-auth/simple-auth.ts[22, 73]: Missing semicolon
ERROR: src/providers/google-auth/google-plus-auth.ts[15, 5]: comment must start with a space
ERROR: src/providers/google-auth/google-plus-auth.ts[33, 38]: Missing semicolon
ERROR: src/providers/google-auth/google-web-auth.ts[10, 46]: missing whitespace
ERROR: src/providers/shared-alert-service/shared-alert.ts[19, 55]: Missing semicolon
ERROR: src/providers/shared-alert-service/shared-alert.ts[23, 49]: Missing semicolon
ERROR: src/providers/shared-alert-service/shared-alert.ts[34, 32]: Missing semicolon
ERROR: src/providers/todo-service/todo-service-firebase.ts[2, 26]: " should be '
ERROR: src/providers/todo-service/todo-service-firebase.ts[11, 3]: comment must start with a space
ERROR: src/providers/todo-service/todo-service-firebase.ts[14, 37]: Missing semicolon
ERROR: src/providers/todo-service/todo-service-firebase.ts[21, 3]: Forbidden 'var' keyword, use 'let' or 'const' instead
ERROR: src/providers/todo-service/todo-service-firebase.ts[23, 31]: comment must start with a space
ERROR: src/providers/todo-service/todo-service-firebase.ts[26, 5]: Forbidden 'var' keyword, use 'let' or 'const' instead
ERROR: src/providers/todo-service/todo-service-firebase.ts[26, 9]: Identifier 'r' is never reassigned; use 'const' instead of 'var'.
ERROR: src/providers/todo-service/todo-service-firebase.ts[26, 13]: Forbidden bitwise operation
ERROR: src/providers/todo-service/todo-service-firebase.ts[28, 30]: Forbidden bitwise operation
ERROR: src/providers/todo-service/todo-service-firebase.ts[28, 30]: Forbidden bitwise operation
ERROR: src/providers/todo-service/todo-service-firebase.ts[40, 3]: comment must start with a space
ERROR: src/providers/todo-service/todo-service-firebase.ts[47, 11]: Identifier 'fireBaseAuth' is never reassigned; use 'const' instead of 'let'.
ERROR: src/providers/todo-service/todo-service-firebase.ts[65, 9]: Identifier 'newTodoList' is never reassigned; use 'const' instead of 'let'.
ERROR: src/services/todo-service.ts[2, 26]: " should be '
ERROR: src/services/todo-service.ts[12, 17]: Forbidden bitwise operation
ERROR: src/services/todo-service.ts[12, 63]: Forbidden bitwise operation
ERROR: src/services/todo-service.ts[12, 63]: Forbidden bitwise operation
ERROR: src/services/todo-service.ts[22, 8]: missing whitespace
ERROR: src/services/todo-service.ts[24, 14]: " should be '
ERROR: src/services/todo-service.ts[25, 14]: " should be '
ERROR: src/services/todo-service.ts[28, 18]: " should be '
ERROR: src/services/todo-service.ts[29, 18]: " should be '
ERROR: src/services/todo-service.ts[33, 18]: " should be '
ERROR: src/services/todo-service.ts[34, 18]: " should be '
ERROR: src/services/todo-service.ts[38, 18]: " should be '
ERROR: src/services/todo-service.ts[39, 18]: " should be '
ERROR: src/services/todo-service.ts[44, 14]: " should be '
ERROR: src/services/todo-service.ts[45, 14]: " should be '
ERROR: src/services/todo-service.ts[48, 18]: " should be '
ERROR: src/services/todo-service.ts[49, 18]: " should be '
ERROR: src/services/todo-service.ts[53, 18]: " should be '
ERROR: src/services/todo-service.ts[54, 18]: " should be '
ERROR: src/services/todo-service.ts[58, 18]: " should be '
ERROR: src/services/todo-service.ts[59, 18]: " should be '
ERROR: src/services/todo-service.ts[72, 7]: comment must start with a space
ERROR: src/services/todo-service.ts[75, 40]: expected nospace before colon in parameter
ERROR: src/services/todo-service.ts[76, 3]: misplaced opening brace
ERROR: src/services/todo-service.ts[81, 7]: Missing semicolon
ERROR: src/services/todo-service.ts[84, 24]: missing whitespace
ERROR: src/services/todo-service.ts[84, 31]: expected nospace before colon in call-signature
ERROR: src/services/todo-service.ts[85, 53]: == should be ===
ERROR: src/services/todo-service.ts[85, 68]: Missing semicolon
ERROR: src/services/todo-service.ts[88, 32]: expected nospace before colon in parameter
ERROR: src/services/todo-service.ts[88, 42]: expected nospace before colon in call-signature
ERROR: src/services/todo-service.ts[89, 9]: Identifier 'todoListsWithUUid' is never reassigned; use 'const' instead of 'let'.
ERROR: src/services/todo-service.ts[89, 58]: == should be ===
ERROR: src/services/todo-service.ts[94, 27]: expected nospace before colon in parameter
ERROR: src/services/todo-service.ts[95, 9]: Identifier 'items' is never reassigned; use 'const' instead of 'let'.
ERROR: src/services/todo-service.ts[95, 44]: == should be ===
ERROR: src/services/todo-service.ts[96, 9]: Identifier 'index' is never reassigned; use 'const' instead of 'let'.
ERROR: src/services/todo-service.ts[96, 53]: == should be ===
ERROR: src/services/todo-service.ts[101, 9]: Identifier 'items' is never reassigned; use 'const' instead of 'let'.
ERROR: src/services/todo-service.ts[101, 44]: == should be ===
ERROR: src/services/todo-service.ts[102, 9]: Identifier 'index' is never reassigned; use 'const' instead of 'let'.
ERROR: src/services/todo-service.ts[102, 53]: == should be ===
ERROR: src/services/todo-service.ts[103, 15]: != should be !==
ERROR: src/services/todo-service.ts[104, 26]: missing whitespace
ERROR: src/services/todo-service.ts[108, 33]: expected nospace before colon in parameter
ERROR: src/services/todo-service.ts[109, 3]: misplaced opening brace
ERROR: src/services/todo-service.ts[111, 9]: Identifier 'index' is never reassigned; use 'const' instead of 'let'.
ERROR: src/services/todo-service.ts[111, 57]: == should be ===
ERROR: src/services/todo-service.ts[112, 15]: != should be !==
ERROR: src/services/todo-service.ts[113, 30]: missing whitespace
ERROR: src/services/todo-service.ts[115, 17]: " should be '
ERROR: src/services/todo-service.ts[115, 29]: Missing semicolon

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}

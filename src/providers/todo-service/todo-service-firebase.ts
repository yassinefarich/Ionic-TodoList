import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import * as Rx from 'rxjs';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {TodoList, TodoListFactory} from '../../model/todo-list';
import {TodoItem} from '../../model/todo-item';
import {GooglePlusAuthProvider} from '../google-auth/google-plus-auth';
import {ToDoAppGoogleAuthProvider} from '../google-auth/google-auth';


const DEFAULT_ROOT_NODE = '/default'
// const USERS_NODE = '/users'

// Lists owned by the current user.
const PERSONAL_LISTS_NODE = '/personal_lists';

// Shared lists with the current user.
const SHARED_LISTS_NODE = '/shared_lists';

/**
 * UUid Generator Credit to :
 *      https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}


@Injectable()
export class TodoServiceProviderFireBase {

  private personalTodoLists: AngularFireList<TodoList>;
  private sharedTodoLists: AngularFireList<string>


  private rootNode: string = null;

  constructor(private angularFireDatabase: AngularFireDatabase, private authProvider: ToDoAppGoogleAuthProvider) {
  }

  private getUserName() {
    if (null === this.rootNode) {
      const fireBaseAuth = this.authProvider.getFirebaseAuth().currentUser;

      this.rootNode = null === fireBaseAuth ? DEFAULT_ROOT_NODE :
        fireBaseAuth.email
          .replace('@', '_')
          .replace('.', '_');

    }
    return this.rootNode;
  }

  private getTodoUserInfo()
  {

  }

  public getList(): Observable<any> {
    const request = `${this.getUserName()}/${PERSONAL_LISTS_NODE}`;
    this.personalTodoLists = this.angularFireDatabase.list(request);

    return this.personalTodoLists.valueChanges();
  }

  //TODO : Review this fu*ing fuunction !!!
  public getSharedList(): Observable<any> {
    const request = `${this.getUserName()}/${SHARED_LISTS_NODE}`;
    this.sharedTodoLists = this.angularFireDatabase.list(request);

    // return this.sharedTodoLists
    //   .valueChanges()
    //   .map(
    //     shared_lsts_url => shared_lsts_url
    //       .map(x => this.angularFireDatabase.object(x).valueChanges())
    //       .reduce((x,y) => Observable.combineLatest(x,y)
    //   )
    // ).switch()


    return this.sharedTodoLists
      .valueChanges()
      .flatMap(
        shared_lsts_url => shared_lsts_url
          .map(x => [x,this.angularFireDatabase.object(x).valueChanges()])
  //    )
  )

  }

  // private getListByURL(url:string)
  // {
  //   this.angularFireDatabase.object(url);
  //   this.sharedTodoLists
  //     .valueChanges().map(x => );
  //
  // }

  public shareListWith(todoList: TodoList, user: string = 'default') {


    let userId = this.formatEmail(user);

    this.angularFireDatabase.list('/' + userId + '/' + SHARED_LISTS_NODE + '/')
      .set(todoList.uuid, this.getUserName() +PERSONAL_LISTS_NODE+'/'+ todoList.uuid);

    if (undefined === todoList.shared_with) {
      todoList.shared_with = new Array<string>();
    }

    todoList.shared_with.push(user);
    console.log(todoList)
    this.updateTodoList(todoList);
  }

  shareListWithCreateCopy(todoList: any, email: string) {
    let userId = this.formatEmail(email);
    this.angularFireDatabase.list('/' + userId + '/' + PERSONAL_LISTS_NODE + '/')
      .set(todoList.uuid, todoList);
  }

  private formatEmail(user: string) {
    return user
      .replace('@', '_')
      .replace('.', '_');
  }

  public getUsersList() : Observable<any> {
    const request = `/`;
    return this.angularFireDatabase.list<TodoItem>(request).valueChanges();
  }
  public createNewTodoList(todoListName: string) {
    const newTodoList: TodoList = TodoListFactory
      .createNewWithNameAndUUid(todoListName, generateUUID());
    return this.personalTodoLists.set(newTodoList.uuid, newTodoList);
  }

  public updateTodoList(todoList: TodoList): Promise<void> {
    return this.personalTodoLists.update(todoList.uuid, todoList);
  }

  public deleteTodoList(todoList: TodoList) {
    return this.personalTodoLists.remove(todoList.uuid);
  }

  public createNewTodo(listUuid: string, newItem: TodoItem) {
    const itemList = this.getTodoItems(listUuid);
    newItem.uuid = generateUUID();
    return itemList.set(newItem.uuid, newItem);
  }

  public updateTodo(listUuid: string, editedItem: TodoItem) {
    return this.getTodoItems(listUuid).update(editedItem.uuid, editedItem);
  }

  public updateTodoByListURL(sharedTodoListURL: string, todoItem: TodoItem) {
    const request = `${sharedTodoListURL}/items`;
    return this.angularFireDatabase.list<TodoItem>(request).update(todoItem.uuid,todoItem);
  }

  public deleteTodo(listUuid: string, uuid: string) {
    return this.getTodoItems(listUuid).remove(uuid);
  }

  public getTodoItemsAsObservable(uuid: string): Observable<TodoItem[]> {
    return this.getTodoItems(uuid).valueChanges();
  }

  public getTodoItems(uuid: string): AngularFireList<TodoItem> {
    const request = `${this.getUserName()}/${PERSONAL_LISTS_NODE}/${uuid}/items`;
    return this.angularFireDatabase.list<TodoItem>(request);
  }

  public getTodoItemsByListURLAsObservable(sharedTodoListURL: string) {
    const request = `${sharedTodoListURL}/items`;
    return this.angularFireDatabase.list<TodoItem>(request).valueChanges();
  }



}



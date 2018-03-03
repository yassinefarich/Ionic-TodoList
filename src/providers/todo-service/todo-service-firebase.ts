import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {TodoList, TodoListFactory} from '../../model/todo-list';
import {TodoItem} from '../../model/todo-item';
import {GooglePlusAuthProvider} from '../google-auth/google-plus-auth';
import {ToDoAppGoogleAuthProvider} from '../google-auth/google-auth';


const DEFAULT_ROOT_NODE = '/default'

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

  private data: AngularFireList<TodoList>;
  private rootNode: string = null;


// TODO : GooglePlusAuthProvider
  constructor(private angularFireDatabase: AngularFireDatabase, private authProvider: ToDoAppGoogleAuthProvider) {
  }

  private getRootNode() {

    if (null === this.rootNode) {
      const fireBaseAuth = this.authProvider.getFirebaseAuth().currentUser;

      this.rootNode = null === fireBaseAuth ? DEFAULT_ROOT_NODE :
        fireBaseAuth.email
          .replace('@', '_')
          .replace('.', '_');

    }
    return this.rootNode;
  }

  public getList(): Observable<any> {
    this.data = this.angularFireDatabase.list(`${this.getRootNode()}/`);

    return this.data.valueChanges();
  }

  public createNewTodoList(todoListName: string) {
    const newTodoList: TodoList = TodoListFactory
      .createNewWithNameAndUUid(todoListName, generateUUID());
    return this.data.set(newTodoList.uuid, newTodoList);
  }

  public updateTodoList(todoList: TodoList): Promise<void> {
    return this.data.update(todoList.uuid, todoList);
  }

  public deleteTodoList(todoList: TodoList) {
    return this.data.remove(todoList.uuid);
  }

  public getTodoItems(uuid: string): AngularFireList<TodoItem> {
    return this.angularFireDatabase.list<TodoItem>(`${this.getRootNode()}/${uuid}/items`);
  }

  public getTodoItemsAsObservable(uuid: string): Observable<TodoItem[]> {
    return this.angularFireDatabase.list<TodoItem>(`${this.getRootNode()}/${uuid}/items`)
      .valueChanges();
  }

  public createNewTodo(listUuid: string, newItem: TodoItem) {
    const itemList = this.getTodoItems(listUuid);
    newItem.uuid = generateUUID();
    return itemList.set(newItem.uuid, newItem);
  }

  public updateTodo(listUuid: string, editedItem: TodoItem) {
    return this.getTodoItems(listUuid).update(editedItem.uuid, editedItem);
  }

  public deleteTodo(listUuid: string, uuid: string) {
    return this.getTodoItems(listUuid).remove(uuid);
  }

  // //Todo: This Function is not used !
  // public getListByUuid(uuid: string): AngularFireList<TodoList> {
  //   return this.angularFireDatabase.list(`${ROOT_NODE}/${uuid}/items`);
  // }

}



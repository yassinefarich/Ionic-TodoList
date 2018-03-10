import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {TodoList, TodoListFactory} from '../../model/todo-list';
import {TodoItem} from '../../model/todo-item';
import {ToDoAppGoogleAuthProvider} from '../google-auth/google-auth';
import {DEFAULT_ROOT_NODE, generateUUID, PERSONAL_LISTS_NODE} from '../Utils';

@Injectable()
export class TodoServiceProviderFireBase {

  private personalTodoLists: AngularFireList<TodoList>;
  private rootNode: string = null;

  constructor(private angularFireDatabase: AngularFireDatabase, private authProvider: ToDoAppGoogleAuthProvider) {
  }

  public getUserName() {
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
    const request = `${this.getUserName()}/${PERSONAL_LISTS_NODE}`;
    this.personalTodoLists = this.angularFireDatabase.list(request);

    return this.personalTodoLists.valueChanges();
  }

  public getUsersList(): Observable<any> {
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


}



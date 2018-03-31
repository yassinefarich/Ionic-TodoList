import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import * as Rx from 'rxjs';
import {TodoList} from '../../model/todo-list';
import {TodoItem} from '../../model/todo-item';
import {formatEmail, PERSONAL_LISTS_NODE, SHARED_LISTS_NODE} from '../Utils';
import {TodoServiceProviderFireBase} from '../todo-service/todo-service-firebase';
import {ToDoAppGoogleAuthProvider} from '../google-auth/google-auth';

@Injectable()
export class ListSharingProvider {

  private sharedTodoLists: AngularFireList<string>;
  private subject = new Rx.Subject();

  constructor(private angularFireDatabase: AngularFireDatabase,
              private todoService: TodoServiceProviderFireBase,
              private authProvider: ToDoAppGoogleAuthProvider) {
  }

  //TODO : If you have time Review This Function -_-
  public getSharedList(): Observable<any> {
    const request = `${this.authProvider.getUserID()}/${SHARED_LISTS_NODE}`;
    this.sharedTodoLists = this.angularFireDatabase.list(request);

    return this.sharedTodoLists.valueChanges()
      .flatMap(urls => urls)
      .map(url => this.angularFireDatabase.object(url).valueChanges().map(list => ({url, list})))
      .mergeAll()
      .filter(x => null !== x.list);
  }


  public shareListWithCurrentUser(todoListURL: string) {
    let userId = this.authProvider.getUserID();

    this.angularFireDatabase.object<TodoList>(todoListURL)
      .valueChanges()
      .subscribe(todoList => {

        this.angularFireDatabase.list('/' + userId + '/' + SHARED_LISTS_NODE + '/')
          .set(todoList.uuid, todoListURL);

        if (undefined === todoList.shared_with) {
          todoList.shared_with = new Array<string>();
        }
        //todoList.shared_with.push(userId);
        //this.todoService.updateTodoList(todoList)

      })

  }

  public shareList(todoList: TodoList, user: string = 'default'): Promise<any> {
    let userId = formatEmail(user);

    this.angularFireDatabase.list('/' + userId + '/' + SHARED_LISTS_NODE + '/')
      .set(todoList.uuid, this.authProvider.getUserID() + PERSONAL_LISTS_NODE + '/' + todoList.uuid);

    if (undefined === todoList.shared_with) {
      todoList.shared_with = new Array<string>();
    }

    todoList.shared_with.push(user);
    return this.todoService.updateTodoList(todoList);
  }

  public shareListWithCreateCopy(todoList: any, email: string): Promise<any> {
    let userId = formatEmail(email);
    return this.angularFireDatabase.list('/' + userId + '/' + PERSONAL_LISTS_NODE + '/')
      .set(todoList.uuid, todoList);
  }

  public updateTodoByListURL(sharedTodoListURL: string, todoItem: TodoItem) {
    const request = `${sharedTodoListURL}/items`;
    return this.angularFireDatabase.list<TodoItem>(request).update(todoItem.uuid, todoItem);
  }

  public createTodoByListURL(sharedTodoListURL: string, todoItem: TodoItem): Promise<any> {
    const request = `${sharedTodoListURL}/items`;
    return this.angularFireDatabase.list<TodoItem>(request).set(todoItem.uuid, todoItem);
  }

  public getTodoItemsByListURLAsObservable(sharedTodoListURL: string) {
    const request = `${sharedTodoListURL}/items`;
    return this.angularFireDatabase.list<TodoItem>(request).valueChanges();
  }

  deleteSharedList(listUUid) {
    let request = this.authProvider.getUserID() + SHARED_LISTS_NODE;
    return this.angularFireDatabase.list<TodoItem>(request).remove(listUUid);
  }

  getListPath(todoList: any, email: string) {
    return this.authProvider.getUserID() + PERSONAL_LISTS_NODE + '/' + todoList.uuid
  }


}

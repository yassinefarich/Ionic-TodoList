import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {TodoList, TodoListFactory} from '../../model/TodoList';
import {TodoItem} from '../../model/TodoItem';


//Root node without slash at the end
const ROOT_NODE = '';

@Injectable()
export class TodoServiceProviderFireBase {

  private data: AngularFireList<TodoList>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  public getList(): Observable<any> {
    this.data = this.angularFireDatabase.list(`${ROOT_NODE}/`);

    return this.data.valueChanges();
  }

  public getListByUuid(uuid : string): AngularFireList<TodoList> {
    return this.angularFireDatabase.list(`${ROOT_NODE}/${uuid}/items`);
  }

  public createNewTodoList(todoListName: string) {
    let newTodoList: TodoList = TodoListFactory.createNewWithName(todoListName);
    const newTodoListKey = this.data.push(newTodoList).key;
    newTodoList.uuid = newTodoListKey;
    return this.data.update(newTodoListKey, newTodoList)
  }

  public getTodos(uuid: string): AngularFireList<TodoItem> {
    return this.angularFireDatabase.list<TodoItem>(`${ROOT_NODE}/${uuid}/items`);
  }

  public getTodosAsObservable(uuid: string): Observable<TodoItem[]> {
    return this.angularFireDatabase.list<TodoItem>(`${ROOT_NODE}/${uuid}/items`)
      .valueChanges();
  }

  public createNewTodo(listUuid: string, newItem: TodoItem) {
    const itemList = this.getTodos(listUuid);
    const newTodoItemKey = itemList.push(newItem).key;
    newItem.uuid = newTodoItemKey;
    return itemList.update(newTodoItemKey, newItem);
  }

  public updateTodo(listUuid: string, editedItem: TodoItem) {
    return this.getTodos(listUuid).update(editedItem.uuid, editedItem);
  }

  public deleteTodo(listUuid: string, uuid: string) {
    return this.getTodos(listUuid).remove(uuid);
  }

  public deleteTodoList(todoList: TodoList) {
    return this.data.remove(todoList.uuid);
  }
}



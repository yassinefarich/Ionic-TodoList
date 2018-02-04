import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {TodoList} from '../../model/TodoList';
import {TodoItem} from '../../model/TodoItem';


@Injectable()
export class TodoServiceProviderFireBase {

  data: AngularFireList<TodoList>;

  constructor(private todosDatabase: AngularFireDatabase) {
    console.log('Hello TodoServiceProvider Provider');
  }

  public getList(): Observable<any> {
    this.data = this.todosDatabase.list('/');
    return this.data.valueChanges();
  }

  public getListByUuid(uuid : string): AngularFireList<TodoList> {
    return this.todosDatabase.list(`/${uuid}/items`);
  }

  public createNewTodoList(todoListName: string) {
    let newTodoList: TodoList = this.makeNewTodoList(todoListName);
    const newTodoListKey = this.data.push(newTodoList).key;
    newTodoList.uuid = newTodoListKey;
    this.data.update(newTodoListKey, newTodoList)

  }

  private makeNewTodoList(todoListName: string): TodoList {
    return {
      uuid: '0',
      name: todoListName,
      items: new Array<TodoItem>()
    };
  }


  public getTodos(uuid: string): AngularFireList<TodoItem> {
    return this.todosDatabase.list<TodoItem>(`/${uuid}/items`);
  }

  public getTodosAsObservable(uuid: string): Observable<TodoItem[]> {
    return this.todosDatabase.list<TodoItem>(`/${uuid}/items`)
      .valueChanges();
  }

  public createNewTodo(listUuid: string, newItem: TodoItem) {
    const itemList = this.getTodos(listUuid);
    const newTodoItemKey = itemList.push(newItem).key;
    newItem.uuid = newTodoItemKey;
    itemList.update(newTodoItemKey, newItem);
  }

  public updateTodo(listUuid: string, editedItem: TodoItem) {
    let items = this.getTodos(listUuid).update(editedItem.uuid, editedItem);
  }

  public deleteTodo(listUuid: string, uuid: string) {
    const itemList = this.getTodos(listUuid).remove(uuid);

  }

  public deleteTodoList(todoList: TodoList) {
    this.data.remove(todoList.uuid);
  }
}



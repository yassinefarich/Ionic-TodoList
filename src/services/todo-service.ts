import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {TodoList} from '../model/TodoList';
import {TodoItem} from '../model/TodoItem';
import {AngularFireDatabase} from 'angularfire2/database';


class Guid {// credit https://gist.github.com/benjamincharity/82ce8651dd53dbee38251e150d62051c
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
      return v.toString(16);
    });
  }
}


@Injectable()
export class TodoServiceProvider {

  data:TodoList[] = [
    {
      uuid : "a351e558-29ce-4689-943c-c3e97be0df8b",
      name : "List 1",
      items : [
        {
          uuid : "7dc94eb4-d4e9-441b-b06b-0ca29738c8d2",
          name : "Item 1-1",
          complete : false
        },
        {
          uuid : "20c09bdd-1cf8-43b0-9111-977fc4d343bc",
          name : "Item 1-2",
          complete : false
        },
        {
          uuid : "bef88351-f4f1-4b6a-965d-bb1a4fa3b444",
          name : "Item 1-3",
          complete : true
        }
      ]
    },
    { uuid : "90c04913-c1a2-47e5-9535-c7a430cdcf9c",
      name : "List 2",
      items : [
        {
          uuid : "72849f5f-2ef6-444b-98b0-b50fc019f97c",
          name : "Item 2-1",
          complete : false
        },
        {
          uuid : "80d4cbbe-1c64-4603-8d00-ee4932045333",
          name : "Item 2-2",
          complete : true
        },
        {
          uuid : "a1cd4568-590b-428b-989d-165f22365485",
          name : "Item 2-3",
          complete : true
        }
      ]
    }
  ];

  constructor(private todosDatabase: AngularFireDatabase) {
    console.log('Hello TodoServiceProvider Provider');
  }

  public getList(): Observable<TodoList[]> {
    return  this.todosDatabase.list('/').valueChanges();
  }

  public createNewTodoList(todoListName : string)
  {
    this.data.push({
      uuid : Guid.newGuid(),
      items : new Array(),
      name : todoListName,
    })
  }

  public getTodos(uuid:String) : Observable<TodoItem[]> {
    return Observable.of(this.data.find(d => d.uuid == uuid).items)
  }

  public getTodoListByUUID(uuid : string) : TodoList {
    let todoListsWithUUid = this.data.filter(d => d.uuid == uuid);
    return (todoListsWithUUid.length > 0) ? todoListsWithUUid[0] : undefined ;

  }

  public editTodo(listUuid : String, editedItem: TodoItem) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == editedItem.uuid);
    items[index] = editedItem;
  }

  public deleteTodo(listUuid: String, uuid: String) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == uuid);
    if (index != -1) {
      items.splice(index,1);
    }
  }

  public deleteTodoList(todoList : TodoList)
  {

    let index = this.data.findIndex(value => value.uuid == todoList.uuid);
    if (index != -1) {
      this.data.splice(index,1);
    }
    console.log("Delete me")
  }
}



import {TodoItem} from './TodoItem';

export interface TodoList {
  uuid: string,
  name: string,
  items: TodoItem[],
}

export class TodoListFactory {
  static createNewWithNameAndUUid(todoListName : string , uuid : string) : TodoList
  {
    return {
      uuid: uuid,
      name: todoListName,
      items: new Array<TodoItem>()
    };
  }
}

import {TodoItem} from './TodoItem';

export interface TodoList {
  uuid: string,
  name: string,
  items: TodoItem[],
}

export class TodoListFactory {
  static createNewWithName(todoListName : string) : TodoList
  {
    return {
      uuid: '0',
      name: todoListName,
      items: new Array<TodoItem>()
    };
  }
}

import {TodoItem} from './todo-item';

export interface TodoList {
  uuid: string;
  name: string;
  items: TodoItem[];
  shared_with?: string[];
}

export interface SharedTodoList {
  uuid: string;
  name: string;
  items: TodoItem[];
  shared_with?: string[];
  url?: string;
}

export class TodoListFactory {
  static createNewWithNameAndUUid(todoListName: string, uuid: string): TodoList {
    return {
      uuid: uuid,
      name: todoListName,
      items: new Array<TodoItem>(),
      shared_with: new Array<string>(),
    };
  }
}

export interface TodoItem {
  uuid: string;
  name: string;
  complete: boolean;
  desc?: string;
}

export class TodoItemFactory {
  static createNewWithName(todoName: string): TodoItem {
    return {name: todoName, complete: false, uuid: '0'};
  }
}

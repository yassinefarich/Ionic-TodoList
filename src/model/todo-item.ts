export interface TodoItem {
  uuid: string;
  name: string;
  complete: boolean;
  desc?: string;
}


export class TodoItemFactory {
  static createNewEmpty(): TodoItem {
    return {name: '', complete: false, uuid: '0'};
  }

}

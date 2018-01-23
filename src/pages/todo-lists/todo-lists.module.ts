import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoListsPage } from './todo-lists';

@NgModule({
  declarations: [
    TodoListsPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoListsPage),
  ],
})
export class TodoListsPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoListePage } from './todo-liste';

@NgModule({
  declarations: [
    TodoListePage,
  ],
  imports: [
    IonicPageModule.forChild(TodoListePage),
  ],
})
export class TodoListePageModule {}

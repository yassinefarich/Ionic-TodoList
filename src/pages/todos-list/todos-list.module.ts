import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoListePage } from './todos-list';

@NgModule({
  declarations: [
    TodoListePage,
  ],
  imports: [
    IonicPageModule.forChild(TodoListePage),
  ],
})
export class TodoListePageModule {}

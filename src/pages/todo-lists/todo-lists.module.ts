import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoListsPage } from './todo-lists';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TodoListsPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoListsPage),
    PipesModule
  ],
})
export class TodoListsPageModule {}

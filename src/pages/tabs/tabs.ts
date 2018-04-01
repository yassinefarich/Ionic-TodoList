import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {TodoListsPage} from '../todo-lists/todo-lists';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TodoListsPage;
  tab3Root = LoginPage;

  constructor() {

  }
}

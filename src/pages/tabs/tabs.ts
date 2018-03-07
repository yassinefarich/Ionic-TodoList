import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {TodoList} from '../../model/todo-list';
import {TodoListsPage} from '../todo-lists/todo-lists';
import {LoginPage} from '../login/login';
import {WebAuthPage} from '../web-auth/simple-auth';
import {SharePage} from '../share/share';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TodoListsPage;
  tab3Root = LoginPage;
  tab4Root = SharePage;

  constructor() {

  }
}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemListPage } from './item-list';
import {MarkdownModule} from 'angular2-markdown';

@NgModule({
  declarations: [
    ItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemListPage),
    MarkdownModule.forRoot(),
  ],
})
export class ItemListPageModule {}

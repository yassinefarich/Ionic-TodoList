import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemEditorPage } from './item-editor';
import {Autoresize} from './autoresize';

@NgModule({
  declarations: [
    ItemEditorPage,
    Autoresize
  ],
  imports: [
    IonicPageModule.forChild(ItemEditorPage),
  ],
})
export class ItemEditorPageModule {}

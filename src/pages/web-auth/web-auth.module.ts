import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebAuthPage } from './web-auth';

@NgModule({
  declarations: [
    WebAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(WebAuthPage),
  ],
})
export class WebAuthPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestartkeyPageRoutingModule } from './restartkey-routing.module';

import { RestartkeyPage } from './restartkey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestartkeyPageRoutingModule
  ],
  declarations: [RestartkeyPage]
})
export class RestartkeyPageModule {}

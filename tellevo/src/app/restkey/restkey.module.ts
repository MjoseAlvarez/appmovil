import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestkeyPageRoutingModule } from './restkey-routing.module';

import { RestkeyPage } from './restkey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestkeyPageRoutingModule
  ],
  declarations: [RestkeyPage]
})
export class RestkeyPageModule {}

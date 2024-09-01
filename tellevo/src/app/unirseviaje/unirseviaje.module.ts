import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnirseviajePageRoutingModule } from './unirseviaje-routing.module';

import { UnirseviajePage } from './unirseviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnirseviajePageRoutingModule
  ],
  declarations: [UnirseviajePage]
})
export class UnirseviajePageModule {}

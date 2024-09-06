import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesviajePageRoutingModule } from './solicitudesviaje-routing.module';

import { SolicitudesviajePage } from './solicitudesviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesviajePageRoutingModule
  ],
  declarations: [SolicitudesviajePage]
})
export class SolicitudesviajePageModule {}

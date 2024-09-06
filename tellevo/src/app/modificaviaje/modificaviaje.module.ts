import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaviajePageRoutingModule } from './modificaviaje-routing.module';

import { ModificaviajePage } from './modificaviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaviajePageRoutingModule
  ],
  declarations: [ModificaviajePage]
})
export class ModificaviajePageModule {}

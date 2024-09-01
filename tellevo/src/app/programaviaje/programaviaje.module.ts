import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramaviajePageRoutingModule } from './programaviaje-routing.module';

import { ProgramaviajePage } from './programaviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramaviajePageRoutingModule
  ],
  declarations: [ProgramaviajePage]
})
export class ProgramaviajePageModule {}

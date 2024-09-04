import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModdatosPageRoutingModule } from './moddatos-routing.module';

import { ModdatosPage } from './moddatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModdatosPageRoutingModule
  ],
  declarations: [ModdatosPage]
})
export class ModdatosPageModule {}

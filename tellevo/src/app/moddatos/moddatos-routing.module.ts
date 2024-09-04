import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModdatosPage } from './moddatos.page';

const routes: Routes = [
  {
    path: '',
    component: ModdatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModdatosPageRoutingModule {}

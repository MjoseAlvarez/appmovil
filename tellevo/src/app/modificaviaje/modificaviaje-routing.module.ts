import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarViajePage } from './modificaviaje.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaviajePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesviajePage } from './solicitudesviaje.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesviajePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnirseviajePage } from './unirseviaje.page';

const routes: Routes = [
  {
    path: '',
    component: UnirseviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnirseviajePageRoutingModule {}

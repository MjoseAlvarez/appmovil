import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramaviajePage } from './programaviaje.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramaviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramaviajePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestkeyPage } from './restkey.page';

const routes: Routes = [
  {
    path: '',
    component: RestkeyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestkeyPageRoutingModule {}

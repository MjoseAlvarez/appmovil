import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestartkeyPage } from './restartkey.page';

const routes: Routes = [
  {
    path: '',
    component: RestartkeyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestartkeyPageRoutingModule {}

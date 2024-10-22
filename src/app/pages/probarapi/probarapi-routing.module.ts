import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProbarapiPage } from './probarapi.page';

const routes: Routes = [
  {
    path: '',
    component: ProbarapiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProbarapiPageRoutingModule {}

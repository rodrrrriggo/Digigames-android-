import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistarolPage } from './vistarol.page';

const routes: Routes = [
  {
    path: '',
    component: VistarolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistarolPageRoutingModule {}

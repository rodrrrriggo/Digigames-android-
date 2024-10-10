import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticasadminPage } from './estadisticasadmin.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticasadminPageRoutingModule {}

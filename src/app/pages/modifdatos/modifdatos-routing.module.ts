import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifdatosPage } from './modifdatos.page';

const routes: Routes = [
  {
    path: '',
    component: ModifdatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifdatosPageRoutingModule {}

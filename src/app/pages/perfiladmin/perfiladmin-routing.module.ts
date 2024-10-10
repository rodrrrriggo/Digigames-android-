import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfiladminPage } from './perfiladmin.page';

const routes: Routes = [
  {
    path: '',
    component: PerfiladminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfiladminPageRoutingModule {}

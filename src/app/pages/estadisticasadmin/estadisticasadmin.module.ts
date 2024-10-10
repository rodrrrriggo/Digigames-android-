import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasadminPageRoutingModule } from './estadisticasadmin-routing.module';

import { EstadisticasadminPage } from './estadisticasadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticasadminPageRoutingModule
  ],
  declarations: [EstadisticasadminPage]
})
export class EstadisticasadminPageModule {}

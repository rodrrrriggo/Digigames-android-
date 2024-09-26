import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaadminPageRoutingModule } from './vistaadmin-routing.module';

import { VistaadminPage } from './vistaadmin.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaadminPageRoutingModule,
    MatIconModule
  ],
  declarations: [VistaadminPage]
})
export class VistaadminPageModule {}

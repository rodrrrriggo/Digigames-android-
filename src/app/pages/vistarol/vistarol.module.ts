import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistarolPageRoutingModule } from './vistarol-routing.module';

import { VistarolPage } from './vistarol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistarolPageRoutingModule
  ],
  declarations: [VistarolPage]
})
export class VistarolPageModule {}

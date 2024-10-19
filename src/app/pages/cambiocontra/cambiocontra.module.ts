import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiocontraPageRoutingModule } from './cambiocontra-routing.module';

import { CambiocontraPage } from './cambiocontra.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiocontraPageRoutingModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [CambiocontraPage]
})
export class CambiocontraPageModule {}

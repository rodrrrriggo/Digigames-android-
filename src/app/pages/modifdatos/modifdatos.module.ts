import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifdatosPageRoutingModule } from './modifdatos-routing.module';

import { ModifdatosPage } from './modifdatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifdatosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifdatosPage,]
})
export class ModifdatosPageModule {}

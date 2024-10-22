import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProbarapiPageRoutingModule } from './probarapi-routing.module';
import { ProbarapiPage } from './probarapi.page';
import{ HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProbarapiPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ProbarapiPage]
})
export class ProbarapiPageModule {}

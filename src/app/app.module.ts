import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SQLite,} from '@awesome-cordova-plugins/sqlite/ngx';
import { ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [ BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatIconModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, provideAnimationsAsync() ], 
  bootstrap: [AppComponent],
})
export class AppModule {}

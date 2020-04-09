import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import { UsuariosComponent } from './gestion/usuarios/usuarios.component';

// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,

    // Pages
    HomeComponent,
    Page2Component,
    UsuariosComponent
  ],

  imports: [
    BrowserModule,
    NgbModule,

    // App
    AppRoutingModule,
    LayoutModule,
    PerfectScrollbarModule
  ],

  providers: [
    Title,
    AppService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

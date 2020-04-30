import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material';


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
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CuentasComponent } from './gestion/cuentas/cuentas.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomDaterangePickerComponent } from './gestion/custom-daterange-picker/custom-daterange-picker.component';
import { ListaDinamicaComponent } from './shared/lista-dinamica/lista-dinamica.component';
import { ConsignacionesComponent } from './gestion/consignaciones/consignaciones.component';
import { MovimientosComponent } from './gestion/movimientos/movimientos.component';
import { CrearUsuariosComponent } from './gestion/crear-usuarios/crear-usuarios.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';
import { AutenticadoGuard } from './shared/guards/autenticado.guard';

// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    Page2Component,
    UsuariosComponent,
    LoginComponent,
    CuentasComponent,
    CustomDaterangePickerComponent,
    ListaDinamicaComponent,
    ConsignacionesComponent,
    MovimientosComponent,
    CrearUsuariosComponent,
    SpinnerComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    MatSnackBarModule,
    // App
    AppRoutingModule,
    LayoutModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RxReactiveFormsModule,
    Ng2ChartsModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],

  providers: [
    Title,
    AppService,
    AutenticadoGuard,
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

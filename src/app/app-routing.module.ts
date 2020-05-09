import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import { UsuariosComponent } from './gestion/usuarios/usuarios.component';
import { LoginComponent } from './auth/login/login.component';
import { CuentasComponent } from './gestion/cuentas/cuentas.component';
import { ConsignacionesComponent } from './gestion/consignaciones/consignaciones.component';
import { MovimientosComponent } from './gestion/movimientos/movimientos.component';
import { Layout2Component } from './layout/layout-2/layout-2.component';
import { CrearUsuariosComponent } from './gestion/crear-usuarios/crear-usuarios.component';
import { AutenticadoGuard } from './shared/guards/autenticado.guard';
import { NoAutenticadoGuard } from './shared/guards/no-autenticado.guard';

// *******************************************************************************
// Routes

const routes: Routes = [
  {
    path: '', component: Layout2Component, pathMatch: 'full', canActivate: [NoAutenticadoGuard], children: [{
      path: '', component: HomeComponent,
    }]
  }, {
    path: 'perfil', component: Layout2Component, canActivate: [NoAutenticadoGuard], children: [{
      path: '', component: Page2Component
    }]
  }, {
    path: '', component: Layout2Component, canActivate: [NoAutenticadoGuard], children: [{
      path: 'usuarios/listar', component: UsuariosComponent
    }]
  },
  {
    path: '', component: Layout2Component, canActivate: [NoAutenticadoGuard], children: [{
      path: 'usuarios/crear', component: CrearUsuariosComponent
    }]
  },
  {
    path: '', component: Layout2Component, canActivate: [NoAutenticadoGuard], children: [{
      path: 'cuentas', component: CuentasComponent
    }]
  }, {
    path: '', component: Layout2Component, canActivate: [NoAutenticadoGuard], children: [{
      path: 'consignaciones', component: ConsignacionesComponent
    }]
  }, {
    path: '', component: Layout2Component, canActivate: [NoAutenticadoGuard], children: [{
      path: 'movimientos/:id', component: MovimientosComponent
    }]
  },
  { path: 'login', component: LoginComponent, canActivate: [AutenticadoGuard] },
  // 404 Not Found page
  { path: '**', component: NotFoundComponent },
];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

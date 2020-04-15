import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import { UsuariosComponent } from './gestion/usuarios/usuarios.component';
import { LoginComponent } from './auth/login/login.component';
import { Layout1FlexComponent } from './layout/layout-1-flex/layout-1-flex.component';
import { CuentasComponent } from './gestion/cuentas/cuentas.component';
import { ConsignacionesComponent } from './gestion/consignaciones/consignaciones.component';
import { MovimientosComponent } from './gestion/movimientos/movimientos.component';
import { Layout2Component } from './layout/layout-2/layout-2.component';
import { CrearUsuariosComponent } from './gestion/crear-usuarios/crear-usuarios.component';

// *******************************************************************************
// Routes

const routes: Routes = [
  {
    path: '', component: Layout2Component, pathMatch: 'full', children: [{
      path: '', component: HomeComponent
    }]
  }, {
    path: 'page-2', component: Layout2Component, children: [{
      path: '', component: Page2Component
    }]
  }, {
    path: '', component: Layout2Component, children: [{
      path: 'usuarios/listar', component: UsuariosComponent
    }]
  },
  {
    path: '', component: Layout2Component, children: [{
      path: 'usuarios/crear', component: CrearUsuariosComponent
    }]
  },
  {
    path: '', component: Layout2Component, children: [{
      path: 'cuentas', component: CuentasComponent
    }]
  }, {
    path: '', component: Layout1FlexComponent, children: [{
      path: 'consignaciones', component: ConsignacionesComponent
    }]
  }, {
    path: '', component: Layout1FlexComponent, children: [{
      path: 'movimientos', component: MovimientosComponent
    }]
  },
  { path: 'login', component: LoginComponent},
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

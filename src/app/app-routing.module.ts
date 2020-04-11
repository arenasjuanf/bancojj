import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Layouts
import { LayoutWithoutNavbarComponent } from './layout/layout-without-navbar/layout-without-navbar.component';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import { UsuariosComponent } from './gestion/usuarios/usuarios.component';
import { LoginComponent } from './auth/login/login.component';
import { Layout1FlexComponent } from './layout/layout-1-flex/layout-1-flex.component';
import { CuentasComponent } from './gestion/cuentas/cuentas.component';

// *******************************************************************************
// Routes

const routes: Routes = [
  {
    path: '', component: Layout1FlexComponent, pathMatch: 'full', children: [{
      path: '', component: HomeComponent
    }]
  }, {
    path: 'page-2', component: Layout1FlexComponent, children: [{
      path: '', component: Page2Component
    }]
  }, {
    path: '', component: Layout1FlexComponent, children: [{
      path: 'usuarios', component: UsuariosComponent
    }]
  }, {
    path: '', component: Layout1FlexComponent, children: [{
      path: 'cuentas', component: CuentasComponent
    }]
  },
  { path: 'login', component: LoginComponent },
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

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

// *******************************************************************************
// Routes

const routes: Routes = [
  {
    path: '', component: LayoutWithoutNavbarComponent, pathMatch: 'full', children: [{
      path: '', component: HomeComponent
    }]
  }, {
    path: 'page-2', component: LayoutWithoutNavbarComponent, children: [{
      path: '', component: Page2Component
    }]
  }, {
    path: '', component: LayoutWithoutNavbarComponent, children: [{
      path: 'usuarios', component: UsuariosComponent
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Layouts

import { Layout1Component } from './layout/layout-1/layout-1.component';
import { Layout1FlexComponent } from './layout/layout-1-flex/layout-1-flex.component';
import { Layout2Component } from './layout/layout-2/layout-2.component';
import { Layout2FlexComponent } from './layout/layout-2-flex/layout-2-flex.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { LayoutFooterComponent } from './layout/layout-footer/layout-footer.component';
import { LayoutHorizontalSidenavComponent } from './layout/layout-horizontal-sidenav/layout-horizontal-sidenav.component';
import { LayoutNavbarComponent } from './layout/layout-navbar/layout-navbar.component';
import { LayoutSidenavComponent } from './layout/layout-sidenav/layout-sidenav.component';
import { LayoutWithoutNavbarComponent } from './layout/layout-without-navbar/layout-without-navbar.component';
import { LayoutWithoutNavbarFlexComponent } from './layout/layout-without-navbar-flex/layout-without-navbar-flex.component';
import { LayoutWithoutSidenavComponent } from './layout/layout-without-sidenav/layout-without-sidenav.component';
// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';

// *******************************************************************************
// Routes

const routes: Routes = [

  { path: '', component: LayoutWithoutNavbarComponent, pathMatch: 'full', children: [
    { path: '', component: HomeComponent },
  ]},

  { path: 'page-2', component: LayoutWithoutNavbarComponent, children: [
    { path: '', component: Page2Component },
  ]},

  // 404 Not Found page
  { path: '**', component: NotFoundComponent }

];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

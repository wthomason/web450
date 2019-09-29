/*
=====================================
  ; Title: app.routing.ts
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: app.routing.ts
======================================
*/

import {Routes} from '@angular/router';
import {BaseLayoutComponent} from './shared';
import {AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import {AuthGuard} from './shared/guards/auth-guard';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {CumulativeSummaryComponent} from './pages/cumulative-summary/cumulative-summary.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cumulative-summary',
        component: CumulativeSummaryComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/not-found'
  }
];

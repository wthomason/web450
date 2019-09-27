import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './shared';
import { CumulativeSummaryComponent } from './pages/cumulative-summary/cumulative-summary.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    CumulativeSummaryComponent,
    DashboardComponent,
    LoginComponent,
    NotFoundComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

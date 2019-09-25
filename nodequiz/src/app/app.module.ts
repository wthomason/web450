import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent
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

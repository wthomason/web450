/*
=====================================
  ; Title: app.component.ts
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: app.component.ts
======================================
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'Node Quiz';
}

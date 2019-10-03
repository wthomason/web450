/*
=====================================
  ; Title: dashboard.component.ts
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: dashboard.component.ts
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  errorMessage: string;
  quizzes: any;

  ngOnInit() {
    
  this.http.get('/api/quizzes/all').subscribe(res => {
    if (res) {
      return this.quizzes = res;      
    } else {
      return this.errorMessage = "OH NO, there were no quizzes were found!!!";
    }
  })

  }//end of ngOnInit

  presentationPage(id){
    this.router.navigateByUrl('/dashboard/presentation/' + id);
  }

  

}

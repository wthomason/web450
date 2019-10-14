/*
=====================================
  ; Title: cumulative-summary.component.ts
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: cumulative-summary.component.ts
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-cumulative-summary',
  templateUrl: './cumulative-summary.component.html',
  styleUrls: ['./cumulative-summary.component.css']
})
export class CumulativeSummaryComponent implements OnInit {

  summaries: any;
  errorMessage: string;


  constructor(private route: ActivatedRoute, private cookieService: CookieService, private http: HttpClient, private router:Router, private fb: FormBuilder, private location: Location) {


    this.http.get('/api/summary/all').subscribe(res => {
      if (res) {
        return this.summaries = res;
      } else {
        return this.errorMessage = "OH NO, I couldn't find the summaries!!!";
      }

    })




  }

  ngOnInit() {
  }

}

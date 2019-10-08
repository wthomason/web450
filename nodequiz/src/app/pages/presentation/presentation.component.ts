/*
=====================================
  ; Title: presentation.component.ts
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: presentation.component.ts
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';


@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  quiz: any;
  urlParamId: string;
  errorMessage: string;


  constructor(private route: ActivatedRoute, private http: HttpClient, private router:Router, private location: Location) {


    this.urlParamId = route.snapshot.paramMap.get('quizId');

    this.http.get('/api/quizzes/'+this.urlParamId).subscribe(res => {
      if (res) {
        return this.quiz = res;
      } else {
        return this.errorMessage = "OH NO, I couldn't find the quiz!!!";
      }

    })


  }

  quizPage(id){
    this.router.navigateByUrl('/dashboard/quiz/' + id);
  }


  ngOnInit() {

  }

  backPage(){
    this.location.back();
  }

}

/*
=====================================
  ; Title: quiz.component.ts
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: quiz.component.ts
======================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: any;
  presentation: any;
  quizResults: any;
  urlParamId: string;
  employeeId: string;
  errorMessage: string;
  form: FormGroup;
  name:string;
  q:any = [];
  qs:any = [];
  score: number;
  isShown:boolean = false;
  displayResults:any;
  
  

  constructor(private route: ActivatedRoute, private cookieService: CookieService, private http: HttpClient, private router:Router, private fb: FormBuilder, private location: Location) {

    this.urlParamId = route.snapshot.paramMap.get('quizId');
    this.employeeId = this.cookieService.get('employeeId');

    this.http.get('/api/quizzes/' + this.urlParamId).subscribe(res => {
      if (res) {
        return this.quiz = res;
      } else {
        return this.errorMessage = "OH NO, I couldn't find the quiz!!!";
      }

    })

   }

  ngOnInit() {

  }

  backPage(){
    this.location.back();
  }

  show(){
  this.isShown = ! this.isShown;
  }


  onSubmit(form){

  
  console.log(form);
   
    this.quizResults = form;
    //this.quizResults['score'] = this.score;
    this.quizResults['employeeId'] = this.employeeId; //adds employeeId to quizResults object
    this.quizResults['quizId'] = this.urlParamId; //adds quizId to the quizResults object
    this.displayResults = JSON.stringify(this.quizResults);

    this.http.post('/api/results/', this.displayResults).subscribe(
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
    

    this.show();
    //console.log(this.quizResults);
  }

}

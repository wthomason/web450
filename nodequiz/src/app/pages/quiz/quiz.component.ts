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
  const totalPossiblePoints = 100;
  const questionCount = this.quiz.questions.length;
  let pointsPerQuestion = totalPossiblePoints / questionCount;
  console.log('Points Per Question: ' + pointsPerQuestion);
  let score = 0;

  let correctRunningTotal = 0;
  let quizQuestionId = [];
  let selectedAnswers = [];
  let correctAnswers = [];


    this.http.post('/api/results/', {
      employeeId: this.employeeId,
      quizId: this.urlParamId,
      result: JSON.stringify(form)
    }).subscribe(
      err => {
        console.log("POST call to results collection in error", err);
      },
      () => {
          console.log("The POST to results collection is now completed.");
      });

    this.quizResults = form;
    this.quizResults['employeeId'] = this.employeeId; //adds employeeId to quizResults object
    this.quizResults['quizId'] = this.urlParamId; //adds quizId to the quizResults object
    this.displayResults = JSON.stringify(this.quizResults);

    for(const prop in this.quizResults){

      if(this.quizResults.hasOwnProperty(prop)){

        if(prop !== 'employeeId' && prop !== 'quizId'){
          quizQuestionId.push(this.quizResults[prop].split(';')[0]);
          selectedAnswers.push(this.quizResults[prop].split(';')[1]);
          correctAnswers.push(this.quizResults[prop].split(';')[2]);
        }
      }
    }

    console.log('questionId array: ' + quizQuestionId);
    console.log('selectedAnswers array: ' + selectedAnswers);
    console.log('correctAnswers array: ' + correctAnswers);

    for(var i = 0; i < selectedAnswers.length; i++){

      for(var j = 0; j < correctAnswers.length; j++){

        if( selectedAnswers[i] == correctAnswers[j]){

          correctRunningTotal ++;

        }
      }
    }

    score = correctRunningTotal * pointsPerQuestion;

    console.log(score);

    this.show();
    //console.log(this.quizResults);
  }

}

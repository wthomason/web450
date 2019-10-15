/*
=====================================
  ; Title: quiz.component.ts
  ; Author: William Thomason
  ; Date: September 29 2019
  ; Description: quiz.component.ts
======================================
*/

import { Component, OnInit, ModuleWithComponentFactories,  HostListener, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import * as moment from "moment";

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
  name: string;
  q: any = [];
  qs: any = [];
  isShown: boolean = false;
  displayResults: any;
  quizSummary: any = [];
  cumulativeSummaryObject: object;
  score: string;
  isShow: boolean; //scroll to top
  topPosToStartShowing = 100; //scroll to top



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

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }


  onSubmit(form){


  //console.log(form);
  const totalPossiblePoints = 100;
  const questionCount = this.quiz.questions.length;
  let pointsPerQuestion = totalPossiblePoints / questionCount;
  //console.log('Points Per Question: ' + pointsPerQuestion);
  let score = 0;

  let correctRunningTotal = 0;
  let quizQuestions = [];
  let selectedAnswers = [];
  let correctAnswers = [];



    this.http.post('/api/results/', {
      employeeId: this.employeeId,
      quizId: this.urlParamId,
      result: JSON.stringify(form)
    }).subscribe(
      res =>{

      },
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
          quizQuestions.push(this.quizResults[prop].split(';')[0]);
          selectedAnswers.push(this.quizResults[prop].split(';')[1]);
          correctAnswers.push(this.quizResults[prop].split(';')[2]);
        }
      }
    }

    //console.log('questionId array: ' + quizQuestionId);
    //console.log('selectedAnswers array: ' + selectedAnswers);
    //console.log('correctAnswers array: ' + correctAnswers);
    //console.log('LOOP FOR ANSWERS STARTS HERE!!!!!!!!!');
    //console.log('selectedAnswers Length: ' + selectedAnswers.length);


    for(let i = 0; i < selectedAnswers.length; i++){

        if( selectedAnswers[i] === correctAnswers[i]){

          correctRunningTotal += 1;
          //console.log('INSIDE if statement');
          //console.log('selectedAnswers: ' + selectedAnswers[i] + ' correctAnswers: ' + correctAnswers[i] + ' correctRunningTotal: ' + correctRunningTotal);

        }
      
    }

    //console.log('correctRunningTotal: ' + correctRunningTotal);
    score = correctRunningTotal * pointsPerQuestion;
    //console.log(score);


   
    for (let i = 0; i < selectedAnswers.length; i++){
      this.quizSummary.push({
        question: quizQuestions[i],
        answer: correctAnswers[i],
        answerGiven: selectedAnswers[i]
      })
    }
   

  this.quizSummary['score'] = score;
   //this.quizSummary['questions'] = this.quiz.questions;
  // this.quizSummary['correctAnswers'] = correctAnswers;
   //this.quizSummary['selectedAnswers'] = selectedAnswers;

  //console.log(this.quizSummary);



    this.cumulativeSummaryObject = {
      employeeId: this.employeeId,
      quizId: this.urlParamId,
      quizName: this.quiz.quizName,
      dateTaken: moment().format('MM/DD/YYYY'),
      score: score
    }


    this.http.post('/api/summary/', {
      employeeId: this.cumulativeSummaryObject['employeeId'],
      quizId: this.cumulativeSummaryObject['quizId'],
      quizName: this.cumulativeSummaryObject['quizName'],
      dateTaken: this.cumulativeSummaryObject['dateTaken'],
      score: this.cumulativeSummaryObject['score']
    }).subscribe(
      res =>{

      },
      err => {
        console.log("POST call to Summary collection in error", err);
      },
      () => {
          console.log("The POST to Summary collection is now completed.");
          this.show();
          this.gotoTop()
      });


    //console.log(this.quizResults);
  }

}

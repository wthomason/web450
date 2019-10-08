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

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: any;
  urlParamId: string;
  errorMessage: string;
  form: FormGroup;


  constructor(private route: ActivatedRoute, private http: HttpClient, private router:Router, private fb: FormBuilder, private location: Location) {

    this.urlParamId = route.snapshot.paramMap.get('quizId');

    this.http.get('/api/quizzes/'+this.urlParamId).subscribe(res => {
      if (res) {
        return this.quiz = res;
      } else {
        return this.errorMessage = "OH NO, I couldn't find the quiz!!!";
      }

    })

   }

  ngOnInit() {
    this.form = this.fb.group({

    });
  }

  backPage(){
    this.location.back();
  }

}

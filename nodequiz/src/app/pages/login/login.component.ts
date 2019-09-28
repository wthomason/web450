import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      employeeId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
  }

  login(){
    const employeeId = this.form.controls['employeeId'].value;
    console.log(employeeId);

    this.http.get('/api/employees/' + employeeId).subscribe( res => {
      if(res){
        this.cookieService.set('isAuthenticate', 'true', 1); //this adds the cookie
        this.router.navigate(['/dashboard']);
      }
      else{

      }
    })

  }

}

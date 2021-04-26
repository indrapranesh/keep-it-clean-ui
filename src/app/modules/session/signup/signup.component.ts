import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignUpReq } from 'src/app/interfaces/session.interface';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router) { 
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
  }

  signup() {
    if(this.signupForm.valid) {
      let body: ISignUpReq = {
        firstName: this.signupForm.get('firstName').value,
        lastName: this.signupForm.get('lastName').value,
        userName: this.signupForm.get('userName').value,
        email: this.signupForm.get('email').value,
        phoneNumber: this.signupForm.get('phoneNumber').value,
        password: this.signupForm.get('password').value,
      }
      console.log(body);
      this.sessionService.signup(body).subscribe(
        (res: any) => {
          this.router.navigate([`account/verify`], {queryParams: {username: res.data.cognitoUserName}})
          console.log('account created');
        },
        (err) => {
          console.log('something went wrong');
        }
      )
    }
  }

  ngOnInit(): void {
  }

}

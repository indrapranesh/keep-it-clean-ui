import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ISignUpReq } from 'src/app/interfaces/session.interface';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('password') public textbox: TextBoxComponent;
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private notificationService: NotificationService) { 
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
          this.notificationService.show({content: 'Verification Code has been sent.',
            animation: { type: 'fade', duration: 800 },
            position: { horizontal: 'center', vertical: 'bottom' }
          })
        },
        (err) => {
          console.log('something went wrong');
          this.notificationService.show({content: err.error.errorMessage,
            animation: { type: 'fade', duration: 800 },
            position: { horizontal: 'center', vertical: 'bottom' }
          })
        }
      )
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.textbox.input.nativeElement.type = 'password';
  }

}

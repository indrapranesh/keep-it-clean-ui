import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { StepperComponent } from '@progress/kendo-angular-layout';
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
  isLoading: boolean = false;

  public signupForm =  new FormGroup({
    personal: new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    }),
    address: new FormGroup({
      address: new FormControl('', [Validators.required]),
      state: new FormControl(''),
      country: new FormControl(''),
      latitude: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required])
    })
  })

  public currentStep = 0;
  @ViewChild('stepper', { static: true })
  public stepper: StepperComponent;

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  private isStepValid = (index: number): boolean => {
      return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  private shouldValidate = (index: number): boolean => {
      return this.getGroupAt(index).touched && this.currentStep >= index;
  };

  public steps = [
    {
        label: 'Personal Details',
        isValid: this.isStepValid,
        validate: this.shouldValidate
    },
    {
        label: 'Address',
        isValid: this.isStepValid,
        validate: this.shouldValidate
    }
  ];

  // Stepper Functions
  public next(): void {
      if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
          this.currentStep += 1;
          return;
      }

      this.currentGroup.markAllAsTouched();
      this.stepper.validateSteps();
  }

  public prev(): void {
      this.currentStep -= 1;
  }

  private getGroupAt(index: number): FormGroup {
      const groups = Object.keys(this.signupForm.controls).map(groupName =>
          this.signupForm.get(groupName)
          ) as FormGroup[];
      return groups[index];
  }

  constructor(private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private notificationService: NotificationService) { 
  }

  signup() {
    if(!this.signupForm.valid) {
      return;
    }
    this.isLoading = true;
    let formValue = this.signupForm.value
    let body: ISignUpReq = {
      firstName: formValue.personal.firstName,
      lastName: formValue.personal.lastName,
      userName: formValue.personal.userName,
      email: formValue.personal.email,
      phoneNumber: formValue.personal.phoneNumber,
      password: formValue.personal.password,
      address: formValue.address.address,
      state: formValue.address.state,
      country: formValue.address.country,
      latitude: formValue.address.latitude,
      longitude: formValue.address.longitude,
    }
    this.sessionService.signup(body).subscribe(
      (res: any) => {
        this.router.navigate([`account/verify`], {queryParams: {username: res.data.cognitoUserName}})
        console.log('account created');
        this.notificationService.show({content: 'Verification Code has been sent.',
          animation: { type: 'fade', duration: 800 },
          position: { horizontal: 'center', vertical: 'bottom' }
        });
        this.isLoading = false;
      },
      (err) => {
        console.log('something went wrong');
        this.notificationService.show({content: err.error.errorMessage,
          animation: { type: 'fade', duration: 800 },
          position: { horizontal: 'center', vertical: 'bottom' }
        });
        this.isLoading = false;
      })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.textbox.input.nativeElement.type = 'password';
  }

}

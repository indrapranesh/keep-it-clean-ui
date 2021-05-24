import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { IVerifyReq } from 'src/app/interfaces/session.interface';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  verifyForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) { 
    this.verifyForm = this.formBuilder.group({
      code: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    })
  }

  verify() {
    this.isLoading = true;
    let body: IVerifyReq = {
      cognitoUserName: this.route.snapshot.queryParams['username'],
      code: this.verifyForm.get('code').value
    }
    this.sessionService.verifyUser(body).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['account/login']);
        this.notificationService.show({content: 'Signup successful. Please login to continue',
          animation: { type: 'fade', duration: 800 },
          position: { horizontal: 'center', vertical: 'bottom' }
        })
      },
      (err) => {
        this.isLoading = false;
        console.log('Code not matched');
        this.notificationService.show({content: err.error.errorMessage,
          animation: { type: 'fade', duration: 800 },
          position: { horizontal: 'center', vertical: 'bottom' }
        })
      }
    )
  }

  ngOnInit(): void {
    if(!this.route.snapshot.paramMap.get('username')) {
      console.log('no username')
    }
  }

}

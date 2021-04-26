import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IVerifyReq } from 'src/app/interfaces/session.interface';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  verifyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.verifyForm = this.formBuilder.group({
      code: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    })
  }

  verify() {
    let body: IVerifyReq = {
      cognitoUserName: this.route.snapshot.queryParams['username'],
      code: this.verifyForm.get('code').value
    }
    this.sessionService.verifyUser(body).subscribe(
      (res) => {
        this.router.navigate(['account/login'])
      },
      (err) => {
        console.log('Code not matched')
      }
    )
  }

  ngOnInit(): void {
    if(!this.route.snapshot.paramMap.get('username')) {
      console.log('no username')
    }
  }

}

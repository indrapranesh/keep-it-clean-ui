import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginReq } from 'src/app/interfaces/session.interface';
import { SessionService } from 'src/app/services/session.service';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { setTokenToLocalStorage } from 'src/app/utils/token.utils';
import { Router } from '@angular/router';
import { ROUTERURL } from 'src/app/constants/url.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  @ViewChild('password') public textbox: TextBoxComponent;

  constructor(private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private router: Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
  }

  login() {
    if(this.loginForm.valid) {
      let body: ILoginReq = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      }
      this.sessionService.login(body).subscribe(
        (res: any) => {
          setTokenToLocalStorage(res.data.session);
          this.sessionService.isAuthenticated.next(true);
          this.router.navigate([ROUTERURL.LANDING]);
        },
        (err) => {
          console.log(err);
          this.notificationService.show({
            content: err.error.errorMessage,
            animation: { type: 'fade', duration: 300 },
            position: { horizontal: 'center', vertical: 'bottom' },
          })
        }
      )
    }
  }

  ngAfterViewInit() {
    this.textbox.input.nativeElement.type = 'password';
  }

  ngOnInit(): void {
  }

}

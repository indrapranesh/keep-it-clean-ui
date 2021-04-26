import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginReq } from 'src/app/interfaces/session.interface';
import { SessionService } from 'src/app/services/session.service';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

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
    private sessionService: SessionService) { 
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
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
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

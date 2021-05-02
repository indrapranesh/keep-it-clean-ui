import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SessionComponent } from './session/session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { LogoutComponent } from './logut/logout.component';


@NgModule({
  declarations: [LoginComponent, SessionComponent, SignupComponent, VerifyComponent, LogoutComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    InputsModule,
    LabelModule,
    IndicatorsModule
  ]
})
export class SessionModule { }

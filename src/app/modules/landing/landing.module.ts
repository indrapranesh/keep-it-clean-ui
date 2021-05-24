import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { DialogModule, SharedModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    DialogModule,
    SharedModule,
    ButtonsModule,
    RouterModule
  ]
})
export class LandingModule { }

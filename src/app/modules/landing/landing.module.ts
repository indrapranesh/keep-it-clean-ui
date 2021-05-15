import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { DialogModule, SharedModule } from '@progress/kendo-angular-dialog';



@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    DialogModule,
    SharedModule
  ]
})
export class LandingModule { }

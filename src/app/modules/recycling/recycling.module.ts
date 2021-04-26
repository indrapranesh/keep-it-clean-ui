import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecyclingRoutingModule } from './recycling-routing.module';
import { RecyclingComponent } from './recycling/recycling.component';


@NgModule({
  declarations: [RecyclingComponent],
  imports: [
    CommonModule,
    RecyclingRoutingModule
  ]
})
export class RecyclingModule { }

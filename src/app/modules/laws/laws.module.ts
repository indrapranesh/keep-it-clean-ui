import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawsRoutingModule } from './laws-routing.module';
import { LawsComponent } from './laws/laws.component';


@NgModule({
  declarations: [LawsComponent],
  imports: [
    CommonModule,
    LawsRoutingModule
  ]
})
export class LawsModule { }

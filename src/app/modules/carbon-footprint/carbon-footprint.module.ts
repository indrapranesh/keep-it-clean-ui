import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarbonFootprintRoutingModule } from './carbon-footprint-routing.module';
import { CarbonFootprintComponent } from './carbon-footprint/carbon-footprint.component';


@NgModule({
  declarations: [CarbonFootprintComponent],
  imports: [
    CommonModule,
    CarbonFootprintRoutingModule
  ]
})
export class CarbonFootprintModule { }

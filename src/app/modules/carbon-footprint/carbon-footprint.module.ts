import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarbonFootprintRoutingModule } from './carbon-footprint-routing.module';
import { CarbonFootprintComponent } from './carbon-footprint/carbon-footprint.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextBoxModule, InputsModule, FormFieldModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule, StepperModule } from '@progress/kendo-angular-layout';
import { CalculateCarbonComponent } from './calculate-carbon/calculate-carbon.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { HomeEmissionComponent } from './home-emission/home-emission.component';
import { VehicleEmissionComponent } from './vehicle-emission/vehicle-emission.component';
import { PublicEmissionComponent } from './public-emission/public-emission.component';
import { ChartModule } from '@progress/kendo-angular-charts';


@NgModule({
  declarations: [CarbonFootprintComponent, CalculateCarbonComponent, HomeEmissionComponent, VehicleEmissionComponent, PublicEmissionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarbonFootprintRoutingModule,
    TextBoxModule,
    InputsModule,
    ButtonsModule,
    LayoutModule,
    DropDownsModule,
    FormFieldModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule,
    DialogsModule,
    StepperModule,
    ChartModule
  ]
})
export class CarbonFootprintModule { }

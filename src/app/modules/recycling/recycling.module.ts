import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecyclingRoutingModule } from './recycling-routing.module';
import { RecyclingComponent } from './recycling/recycling.component';
import { AgmCoreModule } from '@agm/core';
import { AutoCompleteModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormFieldModule, InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CentersListComponent } from './centers-list/centers-list.component';
import { NgxStarsModule } from 'ngx-stars';


@NgModule({
  declarations: [RecyclingComponent, CentersListComponent],
  imports: [
    CommonModule,
    RecyclingRoutingModule,
    AgmCoreModule,
    AutoCompleteModule,
    TextBoxModule,
    InputsModule,
    ButtonsModule,
    LayoutModule,
    DropDownsModule,
    FormFieldModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarsModule
  ]
})
export class RecyclingModule { }

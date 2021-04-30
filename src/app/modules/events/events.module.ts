import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import { FormFieldModule, InputsModule, TextBoxModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';
import { EventFilterComponent } from './event-filter/event-filter.component';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { AgmCoreModule } from '@agm/core';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';


@NgModule({
  declarations: [EventsComponent, EventFilterComponent, EventListComponent, CreateEventComponent ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    TextBoxModule,
    IconsModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    FormFieldModule,
    LayoutModule,
    ButtonsModule,
    InputsModule,
    DropDownsModule,
    AgmCoreModule,
    DateInputsModule,
    IntlModule
  ],
  providers: [
  ]
})
export class EventsModule { }

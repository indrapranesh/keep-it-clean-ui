import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { IconsModule } from '@progress/kendo-angular-icons';
import { EventFilterComponent } from './event-filter/event-filter.component';
import { EventListComponent } from './event-list/event-list.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EventsComponent, EventFilterComponent, EventListComponent, CreateEventComponent ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    TextBoxModule,
    IconsModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventsModule { }

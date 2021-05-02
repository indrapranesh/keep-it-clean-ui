import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from 'src/app/guards/auth-guard.service';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsComponent } from './events/events.component';
import { MyEventsComponent } from './my-events/my-events.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGaurdService],
    component: EventsComponent,
  },
  {
    path: 'details/:id',
    component: EventDetailsComponent
  },
  {
    path: 'my',
    component: MyEventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }

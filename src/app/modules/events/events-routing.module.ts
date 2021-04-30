import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from 'src/app/guards/auth-guard.service';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGaurdService],
    component: EventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }

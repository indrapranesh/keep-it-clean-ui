import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './guards/auth-guard.service';
import { LandingComponent } from './modules/landing/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'laws',
    pathMatch: 'full',
    loadChildren: () =>
            import('./modules/laws/laws.module').then((m) => m.LawsModule),
  },
  {
    path: 'recycling',
    pathMatch: 'full',
    loadChildren: () => 
            import('./modules/recycling/recycling.module').then((m) => m.RecyclingModule),
  },
  {
    path: 'events',
    loadChildren: () => 
            import('./modules/events/events.module').then((m) => m.EventsModule),
  },
  {
    path: 'carbon',
    pathMatch: 'full',
    loadChildren: () => 
            import('./modules/carbon-footprint/carbon-footprint.module').then((m) => m.CarbonFootprintModule),
  },
  {
    path: 'achievements',
    loadChildren: () => 
            import('./modules/achievement/achievement.module').then((m) => m.AchievementModule),
  },
  {
    path: 'account',
    loadChildren: () => 
            import('./modules/session/session.module').then((m) => m.SessionModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawsComponent } from './laws/laws.component';

const routes: Routes = [
  {
    path: '',
    component: LawsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawsRoutingModule { }

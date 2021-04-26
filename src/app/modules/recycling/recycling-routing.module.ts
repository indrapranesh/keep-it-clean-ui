import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecyclingComponent } from './recycling/recycling.component';

const routes: Routes = [
  {
    path: '',
    component: RecyclingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecyclingRoutingModule { }

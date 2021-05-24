import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarbonFootprintComponent } from './carbon-footprint/carbon-footprint.component';

const routes: Routes = [
  {
    path: '',
    component: CarbonFootprintComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarbonFootprintRoutingModule { }

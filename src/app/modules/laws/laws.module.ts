import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawsRoutingModule } from './laws-routing.module';
import { LawsComponent } from './laws/laws.component';
import { GridModule } from '@progress/kendo-angular-grid';


@NgModule({
  declarations: [LawsComponent],
  imports: [
    CommonModule,
    LawsRoutingModule,
    GridModule
  ]
})
export class LawsModule { }

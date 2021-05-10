import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { PlacePredictionService } from './services/place-prediction.service';
import { AgmCoreModule } from '@agm/core';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';












@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    BrowserAnimationsModule,
    SharedModule,
    ButtonsModule,
    InputsModule,
    LabelModule,
    HttpClientModule,
    NotificationModule,
    DialogsModule,
    DropDownsModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: 'AIzaSyB5mVZs-PAwUyj9ueH7UMh6U3tK2XtrSo0'
    }),
    DateInputsModule,
    TreeViewModule,
    IndicatorsModule,
    ChartsModule,
  ],
  providers: [
    PlacePredictionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

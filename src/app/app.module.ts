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
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { PagerModule } from '@progress/kendo-angular-pager';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridModule } from '@progress/kendo-angular-grid';


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
    LayoutModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: <apikey>
    }),
    DateInputsModule,
    TreeViewModule,
    IndicatorsModule,
    ChartsModule,
    ExcelExportModule,
    PopupModule,
    ScrollViewModule,
    PagerModule,
    GridModule,
  ],
  providers: [
    PlacePredictionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

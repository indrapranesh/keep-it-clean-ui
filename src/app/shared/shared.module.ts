import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppBarModule, NavigationModule } from '@progress/kendo-angular-navigation';
import { MenuModule } from '@progress/kendo-angular-menu';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RouterModule } from '@angular/router';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { AddressSearchComponent } from './address-search/address-search.component';
import { AgmCoreModule } from '@agm/core';
import { AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AchievementComponent } from './achievement/achievement.component';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';



@NgModule({
  declarations: [HeaderComponent, AddressSearchComponent, AchievementComponent],
  imports: [
    CommonModule,
    AppBarModule,
    MenuModule,
    NavigationModule,
    LayoutModule,
    ButtonsModule,
    RouterModule,
    NotificationModule,
    AgmCoreModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollViewModule
  ],
  exports: [
    HeaderComponent,
    AddressSearchComponent,
    AchievementComponent
  ]
})
export class SharedModule { }

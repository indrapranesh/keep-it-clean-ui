import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppBarModule, NavigationModule } from '@progress/kendo-angular-navigation';
import { MenuModule } from '@progress/kendo-angular-menu';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { RouterModule } from '@angular/router';
import { NotificationModule } from '@progress/kendo-angular-notification';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    AppBarModule,
    MenuModule,
    NavigationModule,
    LayoutModule,
    ButtonsModule,
    RouterModule,
    NotificationModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
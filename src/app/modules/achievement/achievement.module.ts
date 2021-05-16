import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAchievementsComponent } from './my-achievements/my-achievements.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AchievementRoutingModule } from './achievement-routing.module';
import { LayoutModule } from '@progress/kendo-angular-layout';



@NgModule({
  declarations: [MyAchievementsComponent, AchievementsComponent],
  imports: [
    CommonModule,
    AchievementRoutingModule,
    LayoutModule
  ]
})
export class AchievementModule { }

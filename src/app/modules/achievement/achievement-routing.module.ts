import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAchievementsComponent } from './my-achievements/my-achievements.component';

const routes: Routes = [
  {
    path: 'my',
    component: MyAchievementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievementRoutingModule { }

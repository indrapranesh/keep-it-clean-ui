import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogCloseResult, DialogService } from '@progress/kendo-angular-dialog';
import { AchievementService } from 'src/app/services/achievement.service';
import { UserService } from 'src/app/services/user.service';
import { AchievementComponent } from '../../../shared/achievement/achievement.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  achievement;

  constructor(private dialogService: DialogService,
    private achievementService: AchievementService,
    private userService: UserService) { 
  }

  showAchievements() {
    const dialog = this.dialogService.open({
      title: 'You have unlocked an achievement',
      content: AchievementComponent,
      width: '30%'
    });
    const data = dialog.content.instance;
    data.achievement = this.achievement;
    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
        this.achievementService.achievementShown(this.achievement.id).subscribe((res) => console.log(res));;
      }
    });
  }

  getAchievements() {
    this.achievementService.getUserAchievements(this.userService.getCurrentUser().id).subscribe(
      (res: Array<any>) => {
        let achievements = [];
        if(res.length > 0) {
          res.map((achievement) => {
            if(!achievement.isShown) {
              achievements.push(achievement);
            }
          });
          this.achievement = achievements[0];
          if(achievements[0]) {
            this.showAchievements();
          }
        }
      }
    )
  }

  ngOnInit(): void {
    this.getAchievements();

  }

}

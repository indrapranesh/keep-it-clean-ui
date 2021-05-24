import { Component, OnInit } from '@angular/core';
import { AchievementService } from 'src/app/services/achievement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-achievements',
  templateUrl: './my-achievements.component.html',
  styleUrls: ['./my-achievements.component.scss']
})
export class MyAchievementsComponent implements OnInit {

  achievements = [];
  myachievements = [];

  constructor(private userService: UserService,
    private achievementService: AchievementService) { 
    this.achievementService.getAllAchievements().subscribe((res: any) => {
      this.achievements = res;
      this.achievementService.getUserAchievements(this.userService.getCurrentUser().id).subscribe((res: any)=> {
        this.myachievements = res;
        this.achievements.map((achievement) => {
          this.myachievements.map((my) => {
            if(my.achievementId == achievement.id) {
              achievement['present'] = true
            }
          });
        });
        console.log(this.myachievements)
          console.log(this.achievements)
      })
    });
  }

  ngOnInit(): void {
  }

}

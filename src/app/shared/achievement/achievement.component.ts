import { Component, Input, OnInit } from '@angular/core';
import { AchievementService } from 'src/app/services/achievement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent implements OnInit {

  @Input() achievement: any;
  public width = "100%";
  public height = "400px";

  constructor() { 
  }

  ngOnInit(): void {
  }

}

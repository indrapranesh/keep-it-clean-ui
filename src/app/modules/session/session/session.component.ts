import { Component, OnInit } from '@angular/core';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  
  cardWidth: string = '450px';

  constructor(private breakPointService: BreakpointService) { }

  ngOnInit(): void {
    this.breakPointService.isMobileScreen.asObservable().subscribe((res) => {
      if(res) {
        this.cardWidth = '300px'
      }
    })
  }

}

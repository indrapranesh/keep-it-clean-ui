import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  
  cardWidth: string = '450px';

  constructor() { }

  ngOnInit(): void {
  }

}

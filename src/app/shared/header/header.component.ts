import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navItems = [
    {
      "text": 'Laws',
      "path": '/laws'
    },
    {
      "text": 'Recycling',
      "path": '/recycling'
    },
    {
      "text": 'Events',
      "path": '/events'
    },
    {
      "text": 'Carbon Footprint',
      "path": '/carbondating'
    },
  ];

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}

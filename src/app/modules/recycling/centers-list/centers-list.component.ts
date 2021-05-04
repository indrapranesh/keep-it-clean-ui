import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-centers-list',
  templateUrl: './centers-list.component.html',
  styleUrls: ['./centers-list.component.scss']
})
export class CentersListComponent implements OnInit {

  @Input() centers: [];

  constructor() { }

  onImgError(event) {
    event.target.src = 'assets/images/recycling.jpeg';
  }

  ngOnInit(): void {
  }

}

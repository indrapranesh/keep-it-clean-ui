import { Component, OnInit } from '@angular/core';
import { LawService } from 'src/app/services/law.service';

@Component({
  selector: 'app-laws',
  templateUrl: './laws.component.html',
  styleUrls: ['./laws.component.scss']
})
export class LawsComponent implements OnInit {

  public laws: any[] = [];

  constructor(private lawService: LawService) { }

  ngOnInit(): void {
    this.lawService.getLaws().subscribe((res: any)=> this.laws = res)
  }

}

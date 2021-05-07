import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { units } from 'src/app/constants/carbon.constants';

@Component({
  selector: 'app-home-emission',
  templateUrl: './home-emission.component.html',
  styleUrls: ['./home-emission.component.scss']
})
export class HomeEmissionComponent implements OnInit {

  @Input() public homeForm: FormGroup;
  
  public units = units;

  constructor() { }

  ngOnInit(): void {
  }

}

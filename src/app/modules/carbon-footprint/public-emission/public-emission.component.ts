import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { units } from 'src/app/constants/carbon.constants';

@Component({
  selector: 'app-public-emission',
  templateUrl: './public-emission.component.html',
  styleUrls: ['./public-emission.component.scss']
})
export class PublicEmissionComponent implements OnInit {

  @Input() publicTransportForm: FormGroup;

  public units = units;

  constructor() { }

  ngOnInit(): void {
  }

}

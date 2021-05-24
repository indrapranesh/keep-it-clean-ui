import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { units } from 'src/app/constants/carbon.constants';

@Component({
  selector: 'app-vehicle-emission',
  templateUrl: './vehicle-emission.component.html',
  styleUrls: ['./vehicle-emission.component.scss']
})
export class VehicleEmissionComponent implements OnInit {
  @Input() public vehicleForm: FormGroup;
  
  public units = units;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { CarbonFootprintService } from 'src/app/services/carbon-footprint.service';
import { UserService } from 'src/app/services/user.service';
import { CalculateCarbonComponent } from '../calculate-carbon/calculate-carbon.component';

@Component({
  selector: 'app-carbon-footprint',
  templateUrl: './carbon-footprint.component.html',
  styleUrls: ['./carbon-footprint.component.scss']
})
export class CarbonFootprintComponent implements OnInit {

  carbonData: any;
  emissionData = [];
  isSmallScreen = false;

  constructor(private dialogService: DialogService,
  private carbonService: CarbonFootprintService,
  private userService: UserService,
  private breakPointService: BreakpointService) { 
  }

  openCalculator() {
    let dialogRef = this.dialogService.open({
      title: 'Calculate your carbon footprint',
      content: CalculateCarbonComponent,
      width: this.isSmallScreen ? '90%' : '70%'
    });
    const data = dialogRef.content.instance;
    data.carbonData = this.carbonData;
  }

  init() {
    this.carbonService.getEmissionCategories().subscribe(
      (res) => {
        this.carbonData = res;
    });
    this.carbonService.getAllUserEmission(this.userService.getCurrentUser().id);
    this.carbonService.chartData.asObservable().subscribe((res) => {
      this.emissionData = res;
    });
    this.breakPointService.isMobileScreen.asObservable().subscribe(res => this.isSmallScreen = res);
  }

  ngOnInit(): void {
    this.init();
  }

}

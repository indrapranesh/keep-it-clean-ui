import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { CarbonFootprintService } from 'src/app/services/carbon-footprint.service';
import { UserService } from 'src/app/services/user.service';
import { CalculateCarbonComponent } from '../calculate-carbon/calculate-carbon.component';

@Component({
  selector: 'app-carbon-footprint',
  templateUrl: './carbon-footprint.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./carbon-footprint.component.scss']
})
export class CarbonFootprintComponent implements OnInit {

  carbonData: any;
  emissionData = [];
  isSmallScreen = false;

  constructor(private dialogService: DialogService,
  private carbonService: CarbonFootprintService,
  private userService: UserService,
  private breakPointService: BreakpointService,
  private cdr: ChangeDetectorRef) { 
  }

  openCalculator() {
    let dialogRef = this.dialogService.open({
      title: 'Calculate your carbon footprint',
      content: CalculateCarbonComponent,
      width: this.isSmallScreen ? '90%' : '70%'
    });
  }

  init() {
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

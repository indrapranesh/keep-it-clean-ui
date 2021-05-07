import { Component, OnInit } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { CarbonFootprintService } from 'src/app/services/carbon-footprint.service';
import { CalculateCarbonComponent } from '../calculate-carbon/calculate-carbon.component';

@Component({
  selector: 'app-carbon-footprint',
  templateUrl: './carbon-footprint.component.html',
  styleUrls: ['./carbon-footprint.component.scss']
})
export class CarbonFootprintComponent implements OnInit {

  carbonData: any;

  constructor(private dialogService: DialogService,
    private carbonService: CarbonFootprintService) { }

  openCalculator() {
    let dialogRef = this.dialogService.open({
      title: 'Calculate your carbon footprint',
      content: CalculateCarbonComponent,
      width: '50%'
    });
    const data = dialogRef.content.instance;
    data.carbonData = this.carbonData;
  }

  ngOnInit(): void {
    this.carbonService.getEmissionCategories().subscribe(
      (res) => {
        this.carbonData = res;
      }
    )
  }

}

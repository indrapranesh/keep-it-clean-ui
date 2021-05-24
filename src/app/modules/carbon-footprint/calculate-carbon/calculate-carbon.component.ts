import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { NotificationService } from '@progress/kendo-angular-notification';
import { units } from 'src/app/constants/carbon.constants';
import { UserEmissionReq } from 'src/app/interfaces/carbon.interface';
import { CarbonFootprintService } from 'src/app/services/carbon-footprint.service';
import { UserService } from 'src/app/services/user.service';
import { month } from '../../../constants/date.constants';

@Component({
  selector: 'app-calculate-carbon',
  templateUrl: './calculate-carbon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calculate-carbon.component.scss']
})
export class CalculateCarbonComponent implements OnInit, OnChanges {

  carbonData: Array<any>;
  public units = units;
  carbonEmission: number = 0;
  months = month;
  currentYear: number;
  isLoading = false;

  public cfForm = new FormGroup({
    home: new FormGroup({
      electricity: new FormControl(0),
      electricityUnit: new FormControl(units.electricity.baseUnit, [Validators.required]),
      naturalGas: new FormControl(0),
      naturalGasUnit: new FormControl(units.gas.baseUnit, [Validators.required]),
      LPG: new FormControl(0),
      LPGUnit: new FormControl(units.liquid.baseUnit, [Validators.required]),
      coal: new FormControl(0),
      coalUnit: new FormControl(units.solid.baseUnit, [Validators.required]),
    }),
    vehicle: new FormGroup({
      petrol: new FormControl(0),
      petrolUnit: new FormControl(units.liquid.baseUnit, [Validators.required]),
      diesel: new FormControl(0),
      dieselUnit: new FormControl(units.liquid.baseUnit, [Validators.required]),
    }),
    publicTransport: new FormGroup({
      bus: new FormControl(0),
      busUnit: new FormControl(units.distance.baseUnit, [Validators.required]),
      localTrain: new FormControl(0),
      localTrainUnit: new FormControl(units.distance.baseUnit, [Validators.required]),
      coach: new FormControl(0),
      coachUnit: new FormControl(units.distance.baseUnit, [Validators.required]),
      train: new FormControl(0),
      trainUnit: new FormControl(units.distance.baseUnit, [Validators.required]),
      tram: new FormControl(0),
      tramUnit: new FormControl(units.distance.baseUnit, [Validators.required]),
      subway: new FormControl(0),
      subwayUnit: new FormControl(units.distance.baseUnit, [Validators.required]),
      taxi: new FormControl(0),
      taxiUnit: new FormControl(units.distance.baseUnit, [Validators.required]),
    }),
    resultsForm: new FormGroup({
      month: new FormControl(null, [])
    })
  });

  public currentStep = 0;
  @ViewChild('stepper', { static: true })
  public stepper: StepperComponent;

  private isStepValid = (index: number): boolean => {
      return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  private shouldValidate = (index: number): boolean => {
      return this.getGroupAt(index).touched && this.currentStep >= index;
  };

  public steps = [
    {
        label: 'Home',
        isValid: this.isStepValid,
        validate: this.shouldValidate
    },
    {
        label: 'Vehicle',
        isValid: this.isStepValid,
        validate: this.shouldValidate
    },
    {
        label: 'Public',
        isValid: this.isStepValid,
        validate: this.shouldValidate
    },
    {
      label: 'Results'
    }
  ];

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }


  // Stepper Functions
  public next(): void {
      if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
          this.currentStep += 1;
          return;
      }

      this.currentGroup.markAllAsTouched();
      this.stepper.validateSteps();
  }

  public prev(): void {
      this.currentStep -= 1;
  }

  private getGroupAt(index: number): FormGroup {
      const groups = Object.keys(this.cfForm.controls).map(groupName =>
          this.cfForm.get(groupName)
          ) as FormGroup[];
      return groups[index];
  }

  ngOnChanges() {
    console.log(this.carbonData)
  }

  constructor(private carbonService: CarbonFootprintService,
    private userService: UserService,
    public dialog : DialogRef,
    private notificationService: NotificationService) { 
      this.currentYear = (new Date()).getFullYear();
  }

  calculate() {
    Object.keys(this.cfForm.controls).forEach(key => {
      Object.keys((this.cfForm.controls[key] as FormGroup).controls).forEach((key2: string) => {
        let control = (this.cfForm.controls[key] as FormGroup).controls[key2];
        let group = this.cfForm.controls[key] as FormGroup;
        let valueControl = key2.replace('Unit', '');
        if(control.value == 'litre') {
          control.patchValue(units.liquid.litreToGallon(group.controls[valueControl].value));
        } else if(control.value == 'kg') {
          control.patchValue(units.solid.kgToPound(group.controls[valueControl].value));
        } else if(control.value == 'km') {
          control.patchValue(units.distance.kmToMile(group.controls[valueControl].value));
        }
      });
    });
    this.carbonData.map((category) => {
      (category.activity as Array<any>).map((activity: any) => {
        Object.keys(this.cfForm.controls).forEach(key => {
          Object.keys((this.cfForm.controls[key] as FormGroup).controls).forEach((key2: string) => {
            let control = (this.cfForm.controls[key] as FormGroup).controls[key2];
            if(!key2.includes('Unit') && key2 == activity.activity) {
              console.log(key2);
              this.carbonEmission += (control.value * activity.factor.emissionPerUnit);
            }
          })
        })
      })
    });
    this.carbonEmission = (this.carbonEmission/1000);
    this.next();
  }


  // Save User Emission

  addCarbon() {
    if(!this.cfForm.get('resultsForm').value.month) {
      return;
    }
    this.isLoading = true;
    const date: Date = new Date(new Date().getFullYear(), (this.cfForm.get('resultsForm').value.month.id)-1 , 1,0,0,0);
    console.log(date);
    let body: UserEmissionReq = {
      carbonEmission: this.carbonEmission,
      date:  date
    }
    console.log(body);
    this.carbonService.addUserCarbonEmission(this.userService.getCurrentUser().id, body).subscribe(
      (res) => {
        this.isLoading = false;
        console.log('Emission data added');
        this.carbonService.getAllUserEmission(this.userService.getCurrentUser().id);
        this.notificationService.show({
          content: 'Record Added',
          animation: { type: 'fade', duration: 300 },
          position: { horizontal: 'center', vertical: 'bottom' },
        });
        this.dialog.close();
        this.carbonService.getAllUserEmission(this.userService.getCurrentUser().id);
      },
      (err) => {
        this.isLoading = false;
        this.notificationService.show({
          content: 'Record Added',
          animation: { type: 'fade', duration: 300 },
          position: { horizontal: 'center', vertical: 'bottom' },
        });
        this.dialog.close();
      }
    )
  }


  close() {
    this.dialog.close()
  }

  generateMonths() {
    this.months.map((month, index) => {
      this.carbonService.userEmissions.map((emission)=> {
        let date = new Date(emission.date);
        let year = new Date().getFullYear();
        if(date.getMonth() == index && date.getFullYear() == year) {
          month['disabled'] = true;
        }
      });
    });
    console.log(this.months);
  }

  public itemDisabled(itemArgs: { dataItem: any, index: number }) {
    return itemArgs.dataItem.disabled;
  }

  ngOnInit(): void {
    this.generateMonths();
    this.carbonService.getEmissionCategories().subscribe(
      (res: any) => {
        this.carbonData = res;
    });
  }

}

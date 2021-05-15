import { AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@progress/kendo-angular-dialog';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { NotificationService } from '@progress/kendo-angular-notification';
import * as moment from 'moment';
import { ERROR_MESSAGES, EVENT_MESSAGES } from 'src/app/constants/message.constants';
import { REGEX_CONSTANTS } from 'src/app/constants/regex.constants';
import { ICreateEvent } from 'src/app/interfaces/event.interface';
import { EventService } from 'src/app/services/event.service';
import { PlacePredictionService } from 'src/app/services/place-prediction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  // Timings From and To
  public fromMin: Date = moment().add(1, 'day').toDate();
  public fromMax: Date = moment().add(3, 'months').toDate();
  public format = 'MM/dd/yyyy';

  public fromTime1: Date =  moment().startOf('day').add(1, 'day').toDate();
  public fromTime2: Date = moment().startOf('day').add(1, 'day').add(1, 'hour').toDate();
  public toTime: Date = moment().add(1, 'day').endOf('day').toDate();

  public eventForm = new FormGroup({
    eventDetails: new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(30), Validators.pattern(REGEX_CONSTANTS.ALPHA)]),
      eventType: new FormControl(this.eventService.eventTypes[0], [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(REGEX_CONSTANTS.PHONE_NUMBER_WITH_COUTRY_CODE)]),
      description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(200)]),
    }),
    location: new FormGroup({
      address: new FormControl('', [Validators.required]),
      state: new FormControl(''),
      country: new FormControl(''),
      latitude: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required])
    }),
    timings: new FormGroup({
      day: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required])
    })
  })
  public currentStep = 0;
  isLoading = false;

  @ViewChild('stepper', { static: true })
  public stepper: StepperComponent;

  @ViewChild(AgmMap) public agmMap: AgmMap

  private isStepValid = (index: number): boolean => {
      return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  private shouldValidate = (index: number): boolean => {
      return this.getGroupAt(index).touched && this.currentStep >= index;
  };

  public steps = [
      {
          label: 'Event Details',
          isValid: this.isStepValid,
          validate: this.shouldValidate
      },
      {
          label: 'Location',
          isValid: this.isStepValid,
          validate: this.shouldValidate
      },
      {
          label: 'Timing',
          isValid: this.isStepValid,
          validate: this.shouldValidate
      }
  ];


  constructor(public eventService: EventService,
    private placePredictionService: PlacePredictionService,
    private userService: UserService,
    private notificationService: NotificationService,
    public dialog : DialogRef) { 
  }

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
      const groups = Object.keys(this.eventForm.controls).map(groupName =>
          this.eventForm.get(groupName)
          ) as FormGroup[];

      return groups[index];
  }

  

   dateChange(event: Date) {
    let date = moment(event).startOf('day').toDate();
    this.fromTime1 = moment(date).toDate();
    this.fromTime2 = (moment(date).add(1, 'hour')).toDate();
    this.toTime = (moment(date).endOf('day').toDate());
   }

   timeChange(event: Date, time) {
    let dateString = event.toISOString();
    let date = moment(this.fromTime1).format('DD MM YYYY');
    let startTime, endTime;
    console.log(time);
    if(time == 'start') {
      this.fromTime2 = (moment(moment(dateString).add(1, 'hour'))).toDate();
      startTime = moment(event).format('hh:mm:ss');
      this.eventForm.get('timings').patchValue({
        startTime: moment(`${date} ${startTime}`, 'DD MM YYYY hh:mm:ss').toDate(),
      });
    } else if(time == 'end') {
      this.toTime = moment(dateString).toDate();
      endTime = moment(event).format('hh:mm:ss');
      this.eventForm.get('timings').patchValue({
        endTime: moment(`${date} ${endTime}`, 'DD MM YYYY hh:mm:ss').toDate()
      })
    }
    console.log(this.eventForm.value)
   }

   createEvent() {
    if(this.isLoading) {
      return;
    }
    this.isLoading = true;
    let value = this.eventForm.value;
    let body: ICreateEvent = {
      name: value.eventDetails.name,
      description: value.eventDetails.description,
      eventType: value.eventDetails.eventType.id,
      phoneNumber: value.eventDetails.phoneNumber,
      address: value.location.address,
      state: value.location.state,
      country: value.location.country,
      latitude: value.location.latitude,
      longitude: value.location.longitude,
      creator: (this.userService.getCurrentUser()).id,
      startTime: value.timings.startTime,
      endTime: value.timings.endTime
    }
    this.eventService.createEvent(body).subscribe((res) => {
      this.dialog.close();
      this.notificationService.show({
        content: EVENT_MESSAGES.EVENT_CREATED,
        animation: { type: 'fade', duration: 300 },
        position: { horizontal: 'center', vertical: 'bottom' },
      });
      this.isLoading = false;
    }, (err) => {
      this.dialog.close();
      this.notificationService.show({
        content: ERROR_MESSAGES.SOMETHING_WRONG,
        animation: { type: 'fade', duration: 300 },
        position: { horizontal: 'center', vertical: 'bottom' },
      });
      this.isLoading = false;
    })
   }

   ngOnInit() {}

}

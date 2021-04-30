import { AgmMap } from '@agm/core';
import { Component, ViewChild } from '@angular/core';
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
export class CreateEventComponent {

  public eventForm = new FormGroup({
    eventDetails: new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(2), Validators.maxLength(30), Validators.pattern(REGEX_CONSTANTS.ALPHA)]),
      eventType: new FormControl(this.eventService.eventTypes[0], [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(200)])
    }),
    location: new FormGroup({
      address: new FormControl('', [Validators.required]),
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
  public addressSearchResults = [];
  predictions = [];
  public address: string = '';
  markerPresent = false;

  //map
  latitude: number = 31.9686;
  longitude: number = -99.9018;
  zoom: number = 3;

  // Timings From and To
  public fromMin: Date = moment().toDate();
  public fromMax: Date = moment().add(3, 'months').toDate();
  public format = 'MM/dd/yyyy';

  public fromTime1: Date = moment().toDate();
  public fromTime2: Date = new Date(2000, 2, 10, 2, 30);
  public toTime: Date = new Date(2002, 2, 10, 22, 15)

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

  // Address AutoComplete
  search(term: string){
    console.log('searching');
    this.placePredictionService.getPlacePredictions(term).subscribe(
      (res) => {
        this.predictions = [];
        this.addressSearchResults = [];
        this.predictions = res;
        if(res && res.length) {
          res.map((address) => {
            this.addressSearchResults.push(address.description)
          })
        }
      }
    )
   }
   getLocation(event: string) {
    let placeId;
    if(event.length > 2) {
      placeId = this.predictions.find(x => x.description == event).place_id
      this.placePredictionService.getPlaceDetails(placeId).subscribe(
      (res: any) => {
        this.latitude = res.geometry.location.lat();
        this.longitude = res.geometry.location.lng();
        this.zoom = 13;
        this.markerPresent = true;
        this.address = event;
        this.currentGroup.patchValue({
          address: event, 
          latitude: this.latitude,
          longitude: this.longitude
        });
        this.currentGroup.markAllAsTouched();
      }
    )
    }
   }

   dateChange(event: Date) {
    let date = event.toISOString()
    this.fromTime1 = moment(date).toDate();
    this.fromTime2 = (moment(date).add(1, 'hour')).toDate();
    this.toTime = (moment(date).endOf('day').toDate());
    console.log(this.fromTime1, this.fromTime2, this.toTime)
   }

   timeChange(event: Date, time) {
    let dateString = event.toISOString();
    let date = moment(this.fromTime1).format('DD MM YYYY');
    let startTime, endTime;
    if(time == 'start') {
      this.fromTime2 = (moment(moment(dateString).add(1, 'hour'))).toDate();
      startTime = moment(event).format('hh:mm:ss');
      this.eventForm.get('timings').patchValue({
        startTime: moment(`${date} ${startTime}`, 'DD MM YYYY hh:mm:ss').toDate(),
      })
    } else if(time == 'end') {
      this.toTime = moment(dateString).toDate();
      endTime = moment(event).format('hh:mm:ss');
      this.eventForm.get('timings').patchValue({
        endTime: moment(`${date} ${endTime}`, 'DD MM YYYY hh:mm:ss').toDate()
      })
    }
   }

   createEvent() {
    let value = this.eventForm.value;
    let body: ICreateEvent = {
      name: value.eventDetails.name,
      description: value.eventDetails.description,
      eventType: value.eventDetails.eventType.id,
      address: value.location.address,
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
      })
    }, (err) => {
      this.dialog.close();
      this.notificationService.show({
        content: ERROR_MESSAGES.SOMETHING_WRONG,
        animation: { type: 'fade', duration: 300 },
        position: { horizontal: 'center', vertical: 'bottom' },
      })
    })
   }

}

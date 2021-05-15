import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlacePredictionService } from 'src/app/services/place-prediction.service';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.scss']
})
export class AddressSearchComponent implements OnInit {

  @Input() addressForm: FormGroup;
   //map
   latitude: number = 31.9686;
   longitude: number = -99.9018;
   zoom: number = 3;

  public addressSearchResults = [];
  predictions = [];
  public address: string = '';
  markerPresent = false;

  constructor(private placePredictionService: PlacePredictionService) { }

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
        let state = '';
        let country = '';
        (res.address_components as Array<any>).map((element) => {
          if((element.types as Array<any>).includes('country')) {
            country = element.long_name;
          } else if((element.types as Array<any>).includes('administrative_area_level_1')) {
            state = element.long_name;
          }
        });
        this.addressForm.patchValue({
          address: event, 
          state: state,
          country: country,
          latitude: this.latitude,
          longitude: this.longitude
        });
        console.log(this.addressForm.value)
        this.addressForm.markAllAsTouched();
      }
    )
    }
   }

  ngOnInit(): void {
  }

}

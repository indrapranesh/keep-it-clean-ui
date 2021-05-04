import { AgmMap } from '@agm/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { RECYCLING_CENTER } from 'src/app/constants/message.constants';
import { PlacePredictionService } from 'src/app/services/place-prediction.service';

@Component({
  selector: 'app-recycling',
  templateUrl: './recycling.component.html',
  styleUrls: ['./recycling.component.scss']
})
export class RecyclingComponent implements OnInit {

  @ViewChild(AgmMap) public agmMap: AgmMap;

  location = '';
  predictions = [];
  addressSearchResults = [];
  latitude;
  longitude;
  recyclingCenters = [];

  constructor(private mapService: PlacePredictionService,
    private notificationService: NotificationService) { }

  findRecyclingCenters() {
    if(!this.latitude || !this.longitude) {
      return;
    }
    this.mapService.getNearByRecyclingCenter(this.latitude, this.longitude, 50000).subscribe(
      (res: any) => {
        console.log(res)
        this.recyclingCenters = [];
        (res as Array<any>).map((center) => {
          if(center && !center.photos) {
            center['photo'] = 'assets/images/recycling.jpeg'
          } else {
            center['photo'] = center.photos[0].getUrl()
          }
          if(center.business_status == 'OPERATIONAL' && (center.name as string).toLowerCase().includes('recycl')) {
            this.recyclingCenters.push(center);
          }
        })
        if(this.recyclingCenters.length == 0) {
          this.notificationService.show({
            content: RECYCLING_CENTER.NO_CENTER,
            height: 33,
            hideAfter: 20000,
            animation: { type: 'fade', duration: 300 },
            position: { horizontal: 'center', vertical: 'bottom' },
          });
        }
      },
      (err) => {
        console.log('Something went wrong');
      }
    )
  }

  search(term: string){
    console.log('searching');
    this.mapService.getPlacePredictions(term).subscribe(
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
      this.mapService.getPlaceDetails(placeId).subscribe(
      (res: any) => {
        this.latitude = res.geometry.location.lat();
        this.longitude = res.geometry.location.lng();
      }
    )
    }
  }

  accessLocation() {
    navigator.geolocation.getCurrentPosition((res) => {

    },
    (err) => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    
  }

}

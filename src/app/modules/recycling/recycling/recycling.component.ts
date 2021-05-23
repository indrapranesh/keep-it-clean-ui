import { AgmMap } from '@agm/core';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { RECYCLING_CENTER } from 'src/app/constants/message.constants';
import { PlacePredictionService } from 'src/app/services/place-prediction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recycling',
  templateUrl: './recycling.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  isLoading = false;

  constructor(private mapService: PlacePredictionService,
    private notificationService: NotificationService,
    private userService: UserService,
    private cdr:ChangeDetectorRef) { 
      this.userService.currentUser.asObservable().subscribe((res) => {
        console.log(res);
        if(res?.id) {
          console.log(JSON.parse(res.address.latitude));
          this.location = res.address.address;
          this.latitude = JSON.parse(res.address.latitude);
          this.longitude = JSON.parse(res.address.longitude);
          this.findRecyclingCenters();
        }
      })
  }

  findRecyclingCenters() {
    if(!this.latitude || !this.longitude) {
      return;
    }
    this.isLoading = true;
    this.mapService.getNearByRecyclingCenter(this.latitude, this.longitude, 50000).subscribe(
      (res: any) => {
        let centers = [];
        (res as Array<any>).map((center, index) => {
          console.log(index);
          if(center && !center.photos) {
            center['photo'] = 'assets/images/recycling.jpeg'
          } else {
            center['photo'] = center.photos[0].getUrl()
          }
          if(center.business_status == 'OPERATIONAL' && (center.name as string).toLowerCase().includes('recycl')) {
            centers.push(center);
          }
        })
        if(centers.length == 0) {
          this.notificationService.show({
            content: RECYCLING_CENTER.NO_CENTER,
            height: 33,
            hideAfter: 20000,
            animation: { type: 'fade', duration: 300 },
            position: { horizontal: 'center', vertical: 'bottom' },
          });
        }
        console.log('end');
        this.isLoading = false;
        this.recyclingCenters = centers;
        this.cdr.detectChanges();
      },
      (err) => {
        this.isLoading = false;
        console.log('Something went wrong');
      }
    )
  }

  search(term: string){
    console.log('searching');
    if(term.length == 0) {
      this.location = '';
      this.cdr.detectChanges();
      return;
    }
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
      this.mapService.reverseGeocode(res.coords.latitude, res.coords.longitude).subscribe(
        (location: any) => {
          console.log(location);
          if(location.place_id) {
            console.log('location')
            this.location = location.formatted_address;
            this.latitude = res.coords.latitude;
            this.longitude = res.coords.longitude;
            this.cdr.detectChanges();
            this.findRecyclingCenters();
          }
        }
      )
    },
    (err) => {
      console.log(err);
    })
  }

  navigate(center) {
    let url = `https://www.google.com/maps/dir/?api=1&origin=${this.location}&destination=${center.vicinity}&destination_place_id=${center.place_id}`;
    encodeURI(url);
    window.open(url);
  }

  ngOnInit(): void {}

}

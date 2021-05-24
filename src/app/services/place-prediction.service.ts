import { Injectable, NgZone } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { Observable } from "rxjs";

declare const google: any;

@Injectable()
export class PlacePredictionService {
  private autocompleteService;
  private geoCoderService;
  private placeService;

  constructor(private mapsAPILoader: MapsAPILoader) {

    this.mapsAPILoader.load().then(() => {
      console.log('maps loaded')
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.geoCoderService = new google.maps.Geocoder();
      this.placeService = new google.maps.places.PlacesService(document.createElement('div'));
    });

  }

  // Wrapper for Google Places Autocomplete Prediction API, returns 

  getPlacePredictions(term: string): Observable<any[]> {
    return new Observable(observer => {
      // API Call

      this.autocompleteService.getPlacePredictions({ input: term }, data => {
        let previousData: Array<any[]> = [];

        // Data validation
        console.log(data);
        if (data) {
          console.log(data);
          observer.next(data);
          observer.complete();
        }

        // If no data, emit previous data

        if (!data) {
          console.log("PreviousData: ");
          observer.next(previousData);
          observer.complete();

          // Error Handling

        } else {
          observer.error(status);
        }
      });
    });
  }

  getPlaceDetails(placeId: string) {
    return new Observable(observer => {
        this.geoCoderService.geocode({placeId: placeId}, (results, status) => {
          if (status === "OK") {
            console.log(results[0])
            if(results[0]) {
              observer.next(results[0]);
            }
            observer.complete();
          } else {
           observer.complete();
          }
        })
    })
  }

  reverseGeocode(latitude: number, longitude: number) {
    let location = {
      location: {
        lat: latitude,
        lng: longitude
      }
    }
    return new Observable(observer => {
      this.geoCoderService.geocode(location, (results, status) => {
        if (status === "OK") {
          console.log(results[0])
          if(results[0]) {
            observer.next(results[0]);
          }
          observer.complete();
        } else {
         observer.complete();
        }
      })
    })
  }

  getNearByRecyclingCenter(latitude: number, longitude: number, radius: number) {
    const request = {
      keyword: 'recycling center',
      location: {
        lat: latitude,
        lng: longitude
      },
      radius: radius
    }
    return new Observable(observer => {
      this.placeService.nearbySearch(request, (results, status) => {
        if (status === "OK") {
          observer.next(results);
          observer.complete();
        } else {
         observer.complete();
        }
      })
    })
  }
}
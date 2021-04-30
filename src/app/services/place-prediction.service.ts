import { Injectable, NgZone } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { Observable } from "rxjs";

declare const google: any;

@Injectable()
export class PlacePredictionService {
  private autocompleteService;
  private geoCoderService;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.mapsAPILoader.load().then(() => {
      console.log('maps loaded')
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.geoCoderService = new google.maps.Geocoder();
    });

  }

  // Wrapper for Google Places Autocomplete Prediction API, returns 
  observable

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
}
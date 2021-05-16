import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-centers-list',
  templateUrl: './centers-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./centers-list.component.scss']
})
export class CentersListComponent implements OnInit, OnChanges {

  @Input() centers: [];
  @Output() navigate: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges() {
    console.log(this.centers);
  }

  constructor() { }

  onImgError(event) {
    event.target.src = 'assets/images/recycling.jpeg';
  }

  getDirections(center) {
    this.navigate.emit(center);
  }

  ngOnInit(): void {
  }

}

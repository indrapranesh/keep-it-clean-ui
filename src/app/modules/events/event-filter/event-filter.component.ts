import { Component, OnInit } from '@angular/core';
import { TreeItemLookup } from '@progress/kendo-angular-treeview';
import { eventTypes, sort, timings } from 'src/app/constants/events.constants';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent implements OnInit {

  filters = [
    {
      name: 'Sort',
      values: sort,
      selection: { mode: 'single' }
    },
    {
      name: 'Type',
      values: eventTypes,
      selection: { mode: 'single' }
    },
    {
      name: 'Timings',
      values: timings,
      selection: { mode: 'multiple' }
    }
  ]

  constructor() { }

  handleCheck(event: TreeItemLookup) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}

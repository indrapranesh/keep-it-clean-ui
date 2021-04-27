import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.eventForm = this.formBuilder.group({
      
    })
  }

  ngOnInit(): void {
  }

}

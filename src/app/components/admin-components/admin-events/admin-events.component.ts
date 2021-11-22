import { Component, OnInit } from '@angular/core';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  constructor(private eventService: EventService) { }

  eventname: string;
  description: string;
  date: string;
  numberOfSeats: number = 0;
  ngOnInit(): void {
  }

  onDecrement() {
    if (this.numberOfSeats > 0)
      this.numberOfSeats--;
  }

  onIncrement() {
    this.numberOfSeats++;
  }

  onSubmit() {

    let event = {
      EventID: null,
      EventName: this.eventname,
      Description: this.description,
      Date: new Date().toDateString(),
      SeatsAvailable: this.numberOfSeats,
      Performers: [" "]
    }

    let isBooked = this.eventService.AddEvent(event);
    if (isBooked)
      alert('Event created')
    else {
      alert('Even could not be created');
    }

    this.resetForm();
  }


  resetForm() {
    this.eventname = "";
    this.description= "";
    this.date = "";
    this.numberOfSeats = 0;
  }
}

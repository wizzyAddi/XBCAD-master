import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { BookingService } from 'src/app/services/booking.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  constructor(private eventService: EventService, private bookingService: BookingService) { }

  events: RaakEvent[] = [];
  bookings: Booking[] = [];
  perfromers: any[] = [];
  numberOfBookings: number = 0;
  SeatsAvailable: number = 0;
  perfromersToDisplay: any[] = [];
  isReportError: boolean = false;
  ngOnInit(): void {
   setTimeout(() => {
    this.events = this.eventService.GetEvents();
    this.bookings = this.bookingService.GetBookings();
    this.perfromers = this.bookingService.GetConfirmedPerformers();
   }, 2000);
  }

  eventSelector: string;
  isGenerate: boolean;
  event: RaakEvent;
  dateToDisplay: string;
  //Get all events

  onSelected() {

    if (this.eventSelector == undefined || this.eventSelector == "") {
      this.isReportError = true;
    }
    else {
      this.events.forEach(x => {
        if (this.eventSelector == x.EventName)
          this.event = x;
        this.isGenerate = true;
        this.generateReport();
        console.log(x.EventName)
      })
      this.FilterBookings()
      this.GetPerformers();
    }
  }

  generateReport() {
    let day = this.event.Date.getDate();
    let month = this.event.Date.getMonth();
    let year = this.event.Date.getFullYear();
    this.dateToDisplay = `${day}/${month}/${year}`
  }

  FilterBookings() {
    let index = 0;
    this.bookings.forEach((x) => {
      for (let i = 0; i < this.events.length; i++) {
        if (x.date.getMonth() - 1 == this.events[i].Date.getMonth() - 1 && x.date.getDay() == this.events[i].Date.getDay()) {
          this.numberOfBookings++;
          this.SeatsAvailable = this.events[i].SeatsAvailable;
          index++;
        }

      }
    })
  }
  //Get all confirmed perfromers
  GetPerformers() {
    let index = 0;
    this.perfromers.forEach((x) => {
      for (let i = 0; i < this.events.length; i++) {
        if (x.date.getMonth() - 1 == this.events[i].Date.getMonth() - 1 && x.date.getDay() == this.events[i].Date.getDay()) {
          this.perfromersToDisplay[index] = x;
          index++;
        }

      }
    })
  }

  onTextChanged(){
    this.isReportError = false;
  }
}

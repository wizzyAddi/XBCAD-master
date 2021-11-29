import { Component, OnInit } from '@angular/core';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { BookingService } from 'src/app/services/booking.service';
import { EventService } from 'src/app/services/event.service';
import {Performer } from '../../../models/performer.model'

@Component({
  selector: 'app-performer-requests',
  templateUrl: './performer-requests.component.html',
  styleUrls: ['./performer-requests.component.css']
})
export class PerformerRequestsComponent implements OnInit {

  constructor(public bookingService: BookingService, public eventService: EventService) { }


  PerfomerRequests: Performer[] = this.bookingService.GetPerformerRequests();
  isPerformers: boolean;
  ngOnInit(): void {
    console.log(this.PerfomerRequests.length)
    if (this.PerfomerRequests.length >= 0) {
      this.isPerformers = true;
    }else{
      this.isPerformers
    }

    console.log(this.isPerformers)
  }

  OnAccept(performer: any) {
    alert('Performer has been accepted and an email has been sent');
    this.bookingService.UpdatePerformers(performer, false)
    let index = this.PerfomerRequests.indexOf(performer);
    this.PerfomerRequests.splice(index, 1);
    this.checkData(this.PerfomerRequests.length)
  }

  OnDelete(performer: any) {
    alert('Performer has been rejected and an email has been sent')
    this.bookingService.UpdatePerformers(performer, true)
    let index = this.PerfomerRequests.indexOf(performer);
    this.PerfomerRequests.splice(index, 1);
    this.checkData(this.PerfomerRequests.length)
  }

  checkData(count) {
    if (this.PerfomerRequests.length < 1) {
      this.isPerformers = false
    }
    console.log(this.isPerformers)
  }

  getData() {

  }
}

import { Component, OnInit } from '@angular/core';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { BookingService } from 'src/app/services/booking.service';
import { ContactService } from 'src/app/services/contact.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private eventService: EventService, private bookingService: BookingService, private contactService: ContactService) { }

  events: RaakEvent[] = [];
  performers: any[] = [];
  isEvents = false;
  isPerfromers: boolean = false;
  isContacts: boolean = false;
  contactMessages: any[] = [];
  ngOnInit(): void {
    this.performers = this.bookingService.GetPerformerRequests();
    if(this.performers.length != null){
      this.isPerfromers = true
    }
    this.events = this.eventService.GetEvents();
    if(this.events.length != null){
      this.isEvents = true
    }
    this.contactMessages = this.contactService.GetContacts();
    console.log(this.contactMessages)
    if(this.contactMessages.length != null){
      this.isContacts = true;
    }
  }

}

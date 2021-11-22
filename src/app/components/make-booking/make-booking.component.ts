import { Component, OnInit } from '@angular/core';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { BookingService } from 'src/app/services/booking.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css']
})
export class MakeBookingComponent implements OnInit {

  constructor(private bookingService: BookingService, private eventService: EventService) { }
  firstname: string;
  lastname: string;
  email: string;
  numberOfSeats: number = 0;
  eventname: string;
  events: RaakEvent[] = [];
  index: number = 0;
  isPerformer: boolean = false;
  ngOnInit(): void {

    this.events = this.eventService.GetEvents();
    console.log(this.events)
  }


  onDecrement(){
    if(this.numberOfSeats > 0)
      this.numberOfSeats--;
  }

  onIncrement(){
    this.numberOfSeats++;
  }

  onSubmit(){

    if(!this.isPerformer){
      this.bookGuest()
  //    console.log('Its false')
    }
    else{
      this.bookPerformer();
    // console.log('Its true')
    }

    this.resetForm();
  }


  bookGuest(){
    let booking = {
      Id: "",
      Firstname: this.firstname,
      Lastname: this.lastname,
      Email: this.email,
      NumberOfSeats: this.numberOfSeats,
      EventName: this.eventname

    }

    let isBooked = this.bookingService.AddBooking(booking);
    //console.log(isBooked)
    if(isBooked)
      alert('User has been booked for this event')
    else{
      alert('User could not be booked');
    }
  }

  bookPerformer(){
    let booking = {
      Firstname: this.firstname,
      Lastname: this.lastname,
      Email: this.email,
      EventName: this.eventname,

    }

    let isBooked = this.bookingService.PerformerRequest(booking);
    if(isBooked)
      alert('User has been booked for this event')
    else{
      alert('User could not be booked');
    }
  }

  resetForm(){
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.numberOfSeats = 0;
  }

}

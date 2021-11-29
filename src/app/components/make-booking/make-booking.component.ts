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
  cellphone: string;
  events: RaakEvent[] = [];
  index: number = 0;
  isPerformer: boolean = false;
  date: string;
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
      fName: this.firstname,
      lName: this.lastname,
      email: this.email,
      seats: this.numberOfSeats,
      date: new Date()
    }

    let isBooked = this.bookingService.AddBooking(booking, this.cellphone);
    //console.log(isBooked)
    if(isBooked)
      alert('User has been booked for this event')
    else{
      alert('User could not be booked');
    }
  }

  bookPerformer(){
    let performer = {
      fName: this.firstname,
      lName: this.lastname,
      email: this.email,
      cellphone: this.cellphone,
      event: this.eventname,
      date: this.getEventDate()
    }

    alert(performer.date)

    let isBooked = this.bookingService.PerformerRequest(performer);
    if(isBooked)
      alert('User has been booked for this event')
    else{
      alert('User could not be booked');
    }
  }


  getEventDate(){

    let date;
    for(let i = 0; i < this.events.length; i++){

      if(this.eventname == this.events[i].EventName){
        date = this.events[i].Date;
        console.log(date)
        alert(date)
        break;
      }
    }
    return date;
  }

  resetForm(){
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.numberOfSeats = 0;
  }

}

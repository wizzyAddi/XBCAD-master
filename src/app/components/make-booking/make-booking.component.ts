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
  bookingConfirmation: string;
  //Error checkers
  bookingComplete: boolean;
  isFirstNameError: boolean = false;
  isLastNameError: boolean = false;
  isEmailError: boolean = false;
  isCellphoneError: boolean = false;
  isPerformerError: boolean = false;
  isEventError: boolean = false;
  isSeatsError: boolean = false;
  errorCode: string;
  ngOnInit(): void {

    this.events = this.eventService.GetEvents();
    console.log(this.events)
  }


  onDecrement() {
    this.onTextChanged()
    if (this.numberOfSeats > 0)
      this.numberOfSeats--;
  }

  onIncrement() {
    this.onTextChanged()
    this.numberOfSeats++;
  }

  onSubmit() {


    let isValid = this.inputValidation();

    if (isValid) {

      if (!this.isPerformer) {
        this.bookGuest()
      }
      else {
        this.bookPerformer();
      }
    }

  }


  bookGuest() {
    let booking = {
      fName: this.firstname,
      lName: this.lastname,
      email: this.email,
      seats: this.numberOfSeats,
      date: new Date()
    }

    let isBooked = this.bookingService.AddBooking(booking, this.cellphone);
    this.bookingComplete = true
    if (isBooked){
      this.errorCode = "primary"
      this.bookingConfirmation = "You have been booked"
    }
    else {
      this.errorCode = "danger"
      this.bookingConfirmation = "Booking failed... please try again"
    }

    this.resetForm();
  }

  bookPerformer() {
    let performer = {
      fName: this.firstname,
      lName: this.lastname,
      email: this.email,
      cellphone: this.cellphone,
      event: this.eventname,
      date: this.getEventDate()
    }

    let isBooked = this.bookingService.PerformerRequest(performer);
    this.bookingComplete = true
    if (isBooked){
      this.errorCode = "primary"
      this.bookingConfirmation = "Request has been sent"
    }
    else {
      this.errorCode = "danger"
      this.bookingConfirmation = "Request failed... please try again"
    }

    this.resetForm();
  }


  getEventDate() {

    let date;
    for (let i = 0; i < this.events.length; i++) {

      if (this.eventname == this.events[i].EventName) {
        date = this.events[i].Date;
        break;
      }
    }
    return date;
  }

  resetForm() {
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.numberOfSeats = 0;
  }

  inputValidation() {

    if (this.firstname == undefined || this.firstname == "") {
      this.isFirstNameError = true;
      this.firstname = "";
      return false;
    }

    if (this.lastname == undefined || this.lastname == " ") {
      this.isLastNameError = true;
      this.lastname = "";
      return false;
    }
    if (this.email == undefined || this.email == " ") {
      this.isEmailError = true;
      this.email = "";
      return false;
    }
    if (this.cellphone == undefined || this.cellphone == " ") {
      this.isCellphoneError = true;
      this.cellphone = "";
      return false;
    }
    if (this.isPerformer == false) {

      if (this.numberOfSeats == 0) {
        this.isSeatsError = true;
        return false;
      }

    }
    if (this.eventname == undefined || this.eventname == " ") {
      this.isEventError = true;
      this.eventname = "";
      return false;
    }
    else {
      return true;
    }
  }

  onTextChanged(){
    this.isFirstNameError = false;
    this.isLastNameError = false;
    this.isEmailError = false;
    this.isCellphoneError = false;
    this.isPerformerError = false;
    this.isEventError = false;
    this.isSeatsError = false;
  }
}

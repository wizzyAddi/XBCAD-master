import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { BookingService } from 'src/app/services/booking.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css']
})
export class MakeBookingComponent implements OnInit {

  constructor(private bookingService: BookingService, private eventService: EventService, private router: Router) { }
  firstname: string;
  lastname: string;
  email: string;
  numberOfSeats: number = 0;
  eventname: string;
  cellphone: string;
  events: RaakEvent[] = [];
  bookings: Booking[] = [];
  index: number = 0;
  isPerformer: boolean = false;
  date: string;
  bookingConfirmation: string;
  seatsRemaining: number;
  maxSeats: boolean = true;
  numberOfSeatsClass: string;
  //Error checkers
  bookingComplete: boolean;
  isFirstNameError: boolean = false;
  isLastNameError: boolean = false;
  isEmailError: boolean = false;
  isCellphoneError: boolean = false;
  isPerformerError: boolean = false;
  isEventError: boolean = false;
  isSeatsError: boolean = false;
  isSeatsChecked: boolean = true;
  errorCode: string;
  numberOfSeatsMessage: string;
  cellPhoneErrorMessage: string;
  ngOnInit(): void {

    this.events = this.eventService.GetEvents();
    this.bookings = this.bookingService.GetBookings();
    console.log(this.events)
  }


  onDecrement() {
    this.onTextChanged()
    if (this.numberOfSeats > 0)
      this.numberOfSeats--;
  }

  onIncrement() {
    this.onTextChanged()
    console.log(this.seatsRemaining)
    if(!this.maxSeats && this.numberOfSeats < this.seatsRemaining)
      this.numberOfSeats++;
  }

  onSubmit() {


    let isValid = this.inputValidation();

    if (isValid) {

      if (!this.isPerformer) {
        if(!this.checkCellPhoneNumber() && !this.maxSeats){
          this.bookGuest()
        }

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
      date: this.getEventDate(),

    }

    let isBooked = this.bookingService.AddBooking(booking, this.cellphone);
    this.bookingComplete = true
    if (isBooked){
      this.errorCode = "primary"
      this.bookingConfirmation = "You have been booked"
      setTimeout(() => {

        this.router.navigate(["/"])

      }, 2000)
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
      setTimeout(() => {

        this.router.navigate(["/"])

      }, 2000)
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
    if (this.cellphone == undefined || this.cellphone == "" || this.cellphone == " ") {
      this.isCellphoneError = true;
      this.cellPhoneErrorMessage = "Cellphone number is required"
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

  checkSeatsRemaing(event: any){

    this.onTextChanged();
    let numSeats = 0;
    console.log(this.eventname)

    let eventToCheck;

    this.events.forEach((x) => {

      if(x.EventName == this.eventname){
        eventToCheck = x;
      }

    })

    //console.log(eventToCheck)
    let found = false;
    for(let i = 0; i < this.events.length; i++){

      for(let x = 0; x < this.bookings.length; x++){
        //console.log(this.bookings[x])
        if(eventToCheck.Date.getTime() == this.bookings[x].date.getTime()){
          found = true;
          numSeats += this.bookings[x].seats;

        }
      }
      if(found)
      break;
    }

    this.seatsRemaining = eventToCheck.SeatsAvailable - numSeats

    if(eventToCheck.SeatsAvailable == numSeats || this.seatsRemaining < 0){

      this.numberOfSeatsMessage = " There are no seats left for this event"
      this.numberOfSeatsClass = "text-danger"
      this.maxSeats = true;
    }

    else{

      this.numberOfSeatsMessage = `There are ${this.seatsRemaining} seats available`
      this.numberOfSeatsClass = "text-success"
      this.maxSeats = false;
    }
  }

  checkCellPhoneNumber(){

    this.onTextChanged();
    let isFound = false;
    let eventToCheck;

    this.events.forEach((x) => {

      if(x.EventName == this.eventname){
        eventToCheck = x;
      }

    })



    for(let i = 0; i < this.bookings.length; i++){

      if(this.cellphone == this.bookings[i].cellphone && eventToCheck.Date.getTime() == this.bookings[i].date.getTime()){
        this.isCellphoneError = true;
        this.cellPhoneErrorMessage = "This cellphone number was already used to make a booking for this event."
        isFound = true;
        break;
      }

    }

    return isFound;
  }
}

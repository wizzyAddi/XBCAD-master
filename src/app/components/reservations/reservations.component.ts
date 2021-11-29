import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  fullname: string;
  cellphone: string;
  time: string;

  //Error cheks
  isNameError: boolean = false;
  isCellphoneError: boolean = false;
  isTimeError: boolean = false;
  bookingComplete: boolean = false;
  bookingConfirmation: string;
  errorCode: string;
  ngOnInit(): void {
  }

  onSubmit(){
    let isBooked = this.bookingService.MakeReservation(this.fullname, this.cellphone, this.time);
    this.bookingComplete = true;
    if(isBooked){
      this.errorCode = "primary"
      this.bookingConfirmation = "Reservation has been set"
    }
    else{
      this.errorCode = "primary"
      this.bookingConfirmation = "Reservation could not be set"
    }
  }

  resetForm(){
    this.fullname = "";
    this.cellphone = "";
    this.time = "";
  }

  inputValidation(){

    if (this.fullname == undefined || this.fullname == "") {
      this.isNameError = true;
      this.fullname = "";
      return false;
    }

    if (this.cellphone == undefined || this.cellphone == " ") {
      this.isCellphoneError = true;
      this.cellphone = "";
      return false;
    }
    if (this.time == undefined || this.time == " ") {
      this.isTimeError = true;
      this.time = "";
      return false;
    }
    else{
      return false
    }
  }
}

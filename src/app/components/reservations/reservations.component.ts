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
  ngOnInit(): void {
  }

  onSubmit(){
    let isBooked = this.bookingService.MakeReservation(this.fullname, this.cellphone, this.time);

    if(isBooked){
      alert('user has been booked');
    }
    else{
      alert('User could not be booked')
    }
  }

  resetForm(){
    this.fullname = "";
    this.cellphone = "";
    this.time = "";
;  }
}

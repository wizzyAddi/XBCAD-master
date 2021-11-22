import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Booking } from '../models/booking.model';
import { RaakEvent } from '../models/raak-event.model';

@Injectable({
  providedIn: 'root'
})


export class BookingService {

  formData: Booking
  bookings: Booking[] = [];
  performers: any[] = [];
  constructor(private fireDb: AngularFireDatabase) { }


  AddBooking(booking: Booking) {
    var ref = this.fireDb.database.ref('Bookings')
    let index = 0;
    try {

      ref.get().then((snapshot) => {
        index = snapshot.numChildren() + 1;
        booking.Id = index.toString();
        this.fireDb.database.ref(`Bookings/${index}`).set(booking);
      })
      return true;
    }catch(err){
      throw err;
    }
  }

  GetBookings(){
    let index = 0;
    var ref = this.fireDb.database.ref('Bookings')
    try{
      ref.get().then((snapshot) => {
        snapshot.forEach(x => {

          let booking = {
            Id: x.val().Id,
            Firstname: x.val().Firstname,
            Lastname: x.val().Lastname,
            Email: x.val().Email,
            NumberOfSeats: x.val().NumberOfSeats,
            EventName: x.val().EventName
          }

          this.bookings[index] = booking;

          index++;

        })
      })

      return this.bookings;
    }catch(err){
      throw err;
    }
  }

  PerformerRequest(booking:any){
    try{

      var ref = this.fireDb.database.ref("PerformerRequests");
      ref.get().then(snapshot => {
        let id = snapshot.numChildren() + 1;
        let performer = {
          id: id,
          firstname: booking.Firstname,
          lastname: booking.Lastname,
          email: booking.Email,
          eventname: booking.EventName

        };
        this.fireDb.database.ref(`PerformerRequests/${id.toString()}`).set(performer);
      })
      return true;

    }catch(err){
      throw err;
    }
  }

  GetPerformerRequests(){

    var ref = this.fireDb.database.ref("PerformerRequests");
    let index = 0;
    try{

      ref.get().then(snapshot => {
        if(snapshot.exists()){
          snapshot.forEach(x => {

            this.performers[index] = {
              id: x.val().id,
              firstname: x.val().firstname,
              lastname: x.val().lastname,
              email: x.val().email,
              eventname: x.val().eventname
            }

            index++;
          })
        }
      })

      return this.performers;

    }catch(err){
      throw err;
    }

  }

  DeleteRequest(performer: any){
    var ref = this.fireDb.database.ref(`PerformerRequests/${performer.id}`);

    try{

      ref.remove().then(() => {
        console.log('Event deleted');
      });

       return true;
    }catch(err){
      throw err;
    }
  }

}

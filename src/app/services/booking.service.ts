import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Booking } from '../models/booking.model';
import { Performer } from '../models/performer.model'
import { RaakEvent } from '../models/raak-event.model';

@Injectable({
  providedIn: 'root'
})


export class BookingService {

  formData: Booking
  bookings: Booking[] = [];
  performers: any[] = [];
  confirmedPerformers: any[] = [];
  constructor(private fireDb: AngularFireDatabase) { }


  AddBooking(booking: Booking, cellphone: string) {

    let index = 0;
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dateString = `${year}-${(month + 1)}-${day}`;

    console.log(booking.date)
    try {
      var ref = this.fireDb.database.ref(`Bookings/${dateString}/${cellphone}`).set(booking);
      return true;
    } catch (err) {
      throw err;
    }
  }

  GetBookings() {
    let index = 0;
    var ref = this.fireDb.database.ref('Bookings')
    try {
      ref.get().then((snapshot) => {
        snapshot.forEach(x => {

          x.forEach(v => {

            this.bookings[index] = {
              fName: v.val().fName,
              lName: v.val().lName,
              email: v.val().email,
              seats: v.val().seats,
              date: new Date(x.key)
            }
            index++;
          })

        })
      })

      return this.bookings;
    } catch (err) {
      throw err;
    }
  }

  GetBookingsSpecific(date: Date) {
    let index = 0;
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dateString = `${year}-${(month + 1)}-${day}`;

    var ref = this.fireDb.database.ref(`Bookings/${dateString}`)
    try {
      ref.get().then((snapshot) => {
        snapshot.forEach(x => {

          x.forEach(v => {

            this.performers[index] = {
              fName: v.val().fName,
              lName: v.val().lName,
              email: v.val().email,
              cellphone: v.val().cellphone,
              date: x.key,
              event: v.val().event
            }
            index++;
          })

        })
      })

      return this.bookings;
    } catch (err) {
      throw err;
    }
  }

  PerformerRequest(performer: Performer) {
    let date = new Date(performer.date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dateString = `${year}-${(month + 1)}-${day}`;
    try {
      console.log(performer)
      this.fireDb.database.ref(`PerformerRequests/${dateString}/${performer.cellphone}`).set(performer);
      return true;

    } catch (err) {
      throw err;
    }
  }

  GetPerformerRequests() {

    var ref = this.fireDb.database.ref("PerformerRequests");
    let index = 0;
    try {

      ref.get().then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(x => {

            x.forEach(v => {

              this.performers[index] = {
                fName: v.val().fName,
                lName: v.val().lName,
                email: v.val().email,
                cellphone: v.val().cellphone,
                date: x.key,
                event: v.val().event
              }
              index++;
            })
          })
        }
      })
      return this.performers;

    } catch (err) {
      throw err;
    }

  }

  GetConfirmedPerformers() {
    var ref = this.fireDb.database.ref("ConfirmedPerformers");
    let index = 0;
    try {

      ref.get().then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(x => {

            x.forEach(v => {
              this.confirmedPerformers[index] = {
                fName: v.val().fName,
                lName: v.val().lName,
                email: v.val().email,
                cellphone: v.val().cellphone,
                date: new Date (x.key),
                event: v.val().event
              }
              index++;
            })
          })
        }
      })
      return this.confirmedPerformers;

    } catch (err) {
      throw err;
    }

  }

  UpdatePerformers(performer: Performer, isDelete: boolean) {
    if (isDelete) {
      this.DeleteRequest(performer);
    }
    else {
      let date = new Date(performer.date);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let dateString = `${year}-${(month + 1)}-${day}`;

      try {
        var ref = this.fireDb.database.ref(`ConfirmedPerformers/${dateString}/${performer.cellphone}`);
        ref.set(performer);
        this.DeleteRequest(performer)
      } catch (err) {
        return false;
      }
    }
  }

  DeleteRequest(performer: Performer) {
    var ref = this.fireDb.database.ref(`PerformerRequests/${performer.date}`).child(`${performer.cellphone}`);

    try {

      ref.remove().then(() => {
        console.log('Event deleted');
      });

      return true;
    } catch (err) {
      throw err;
    }
  }

  MakeReservation(name:string, cellphone: string, time: string){

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dateString = `${year}-${(month + 1)}-${day}`;
    try {
      var ref = this.fireDb.database.ref(`reservations/${dateString}/${cellphone}`).set({name: name, cellphone: cellphone, time: time});
      return true;
    } catch (err) {
      throw err;
    }

  }
}

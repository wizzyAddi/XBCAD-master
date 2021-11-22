import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { RaakEvent } from '../models/raak-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private fireDatabase: AngularFireDatabase) { }

  events: RaakEvent[] = [];

  AddEvent(event: RaakEvent){

    var ref = this.fireDatabase.database.ref("Events")

    let index = 0;

    try{

      ref.get().then((snapshot) => {

        index = snapshot.numChildren() + 1;
        console.log(snapshot.numChildren())
        event.EventID = index.toString();
        this.fireDatabase.database.ref(`Events/${index}`).set(event)
      })

      return true;

    }catch(err){
      throw err;
    }
  }

  GetEvents(){
    let index = 0;
    var ref = this.fireDatabase.database.ref('Events')
    try{
      ref.get().then((snapshot) => {
        snapshot.forEach(x => {

          let event = {

            EventID: x.val().EventID,
            EventName: x.val().EventName,
            Description: x.val().Description,
            Date: x.val().Date,
            SeatsAvailable: x.val().SeatsAvailable,
            Performers: x.val().Performers
          }

          this.events[index] = event;

          index++;

        })
      })

      return this.events;
    }catch(err){
      throw err;
    }
  }


  UpdateEventDetails(event: RaakEvent){

    var ref = this.fireDatabase.database.ref(`Events/${event.EventID}`);

    try{
      console.log(event)
      ref.update(event);
      return true;

    }catch(err){
      throw err;
    }
  }
}

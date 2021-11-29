import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage'
import { RaakEvent } from '../models/raak-event.model';
import { Upload } from '../models/upload'
import { UploadService } from './upload.service'
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private fireDatabase: AngularFireDatabase ) { }

  events: RaakEvent[] = [];

  AddEvent(event: RaakEvent){

    let day = event.Date.getDate();
    let month = event.Date.getMonth();
    let year = event.Date.getFullYear();
    let dateString = `${year}-${(month + 1)}-${day}`;
    var ref = this.fireDatabase.database.ref(`Events/${dateString}`)

    try{

     ref.set(event);

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
            EventName: x.val().EventName,
            Description: x.val().Description,
            Date: new Date(x.key),
            SeatsAvailable: x.val().SeatsAvailable,
            Performers: x.val().Performers,
            ImagePath: x.val().ImagePath
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

    var ref = this.fireDatabase.database.ref(`Events/${event.Date}`);

    try{
      ref.update(event);
      return true;

    }catch(err){
      throw err;
    }
  }
}

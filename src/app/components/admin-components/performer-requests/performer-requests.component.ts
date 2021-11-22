import { Component, OnInit } from '@angular/core';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { BookingService } from 'src/app/services/booking.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-performer-requests',
  templateUrl: './performer-requests.component.html',
  styleUrls: ['./performer-requests.component.css']
})
export class PerformerRequestsComponent implements OnInit {

  constructor(public bookingService: BookingService, public eventService: EventService) { }


  PerfomerRequests: any[] = [];
  Events: RaakEvent[] = [];

  ngOnInit(): void {
    this.PerfomerRequests = this.bookingService.GetPerformerRequests();
    this.Events = this.eventService.GetEvents();
    console.log(this.PerfomerRequests)
  }

  OnAccept(performer: any) {
    alert('Performer has been accepted and an email has been sent');
    this.findCorrsepondingEvent(performer);
    this.bookingService.DeleteRequest(performer)
    let index = this.PerfomerRequests.indexOf(performer);
    this.PerfomerRequests.splice(index, 1);
  }

  OnDelete(performer: any) {
    alert('Performer has been rejected and an email has been sent')
    this.bookingService.DeleteRequest(performer)
    let index = this.PerfomerRequests.indexOf(performer);
    this.PerfomerRequests.splice(index, 1);
  }

  private findCorrsepondingEvent(performer: any){

      let eventName;

      //console.log(performer)
      for(let i = 0; i <= this.Events.length - 1; i++){
       // console.log(this.Events)
        if(performer.eventname == this.Events[i].EventName){
          console.log("There is a match")
          let x = this.Events[i].Performers.length == null? 0 : this.Events[i].Performers.length - 1;
          this.Events[i].Performers[x] = performer;
          console.log(this.Events[i].Performers[x]);
          if(this.eventService.UpdateEventDetails(this.Events[i])){}
            console.log("Event has been updated");
          break;
        }
      }

      return eventName;
  }
}

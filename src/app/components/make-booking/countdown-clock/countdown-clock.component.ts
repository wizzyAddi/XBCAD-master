import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent implements OnInit, OnDestroy {

  constructor(private eventSevice: EventService) { }

  private subscription: Subscription;

  events: RaakEvent[] = [];
  public dateNow = new Date();
  public dDay = new Date();
  public timeDifference;
  public secondsToDday;
  public minutesToDday
  public hoursToDday;
  public daysToDday;
  public timeToDisplay: string;



  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - this.dateNow.getTime() ;
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {

    this.secondsToDday = Math.floor((timeDifference) % (1000 * 60) / (1000))
    this.minutesToDday = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    this.hoursToDday = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.daysToDday = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    this.timeToDisplay = `${this.appendNumber(this.daysToDday)}  :  ${this.appendNumber(this.hoursToDday)} : ${this.appendNumber(this.minutesToDday)} `;
  }

  ngOnInit(): void {
    this.events = this.eventSevice.GetEvents();
    this.GetLatestDate()
    this.subscription = interval(1000).subscribe(x => {
      this.getTimeDifference();
    })
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

  appendNumber(num: number) {

    if (num < 10) {
      var formattedNumber = ("0" + num).slice(-2);
      return formattedNumber;

    }
    else {
      return num;
    }
  }

  GetLatestDate() {



    let latestDate;
    setTimeout((x) => {
      let temp = new Date();
      for(let i = 0; i <= this.events.length-1; i++){

        if (temp.getTime() < this.events[i].Date.getTime()) {
          temp = this.events[i].Date ;
        }

      }

      this.dDay = temp;
    }, 1000)
  }
}

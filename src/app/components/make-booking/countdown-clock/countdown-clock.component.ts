import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent implements OnInit, OnDestroy {

  constructor() { }

  private subscription: Subscription;

  public dateNow = new Date();
  public dDay = new Date('Nov 24 2021 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday
  public hoursToDday;
  public daysToDday;
  public timeToDisplay: string;

  private getTimeDifference(){
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference){

    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
    this.timeToDisplay = `${this.appendNumber(this.daysToDday)}  :  ${this.appendNumber(this.hoursToDday)} : ${this.appendNumber(this.minutesToDday)} `;
  }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe( x => {
      this.getTimeDifference();
    })
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

  appendNumber(num: number){

    if(num < 10){
      var formattedNumber = ("0" + num ).slice(-2);
      return formattedNumber;

    }
    else{
      return num;
    }


  }

}

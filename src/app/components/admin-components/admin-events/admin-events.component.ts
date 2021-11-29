import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { MatDatepicker } from '@angular/material/datepicker';
import { RaakEvent } from 'src/app/models/raak-event.model';
import { EventService } from 'src/app/services/event.service';
import { Url } from 'url';
import { Upload } from '../../../models/upload'
import { UploadService } from '../../../services/upload.service'

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  constructor(private eventService: EventService, private uploadService: UploadService) { }

  eventname: string;
  description: string;
  date: string;
  numberOfSeats: number = 0;
  picker: Date;
  image: any;

  ngOnInit(): void {

  }

  onDecrement() {
    if (this.numberOfSeats > 0)
      this.numberOfSeats--;
  }

  onIncrement() {
    this.numberOfSeats++;
  }

  onSubmit() {
    let inDate = new Date(this.date);

    let upload = new Upload(this.image);
    let event = {
      EventName: this.eventname,
      Description: this.description,
      Date: inDate,
      SeatsAvailable: this.numberOfSeats,
      ImagePath: upload.file.name
    }

    let isBooked = this.uploadService.pushUpload(event, upload, true)
    if (isBooked)
      alert('Event created')
    else {
      alert('Even could not be created');
    }

    this.resetForm();
  }


  stopInterval(stop) {
    clearInterval(stop)
  }

  resetForm() {
    this.eventname = "";
    this.description = "";
    this.date = "";
    this.image = "";
    this.numberOfSeats = 0;
  }

  onChange(event: any) {
    console.log(event.target.files[0])
    this.image = event.target.files[0];
  }
}

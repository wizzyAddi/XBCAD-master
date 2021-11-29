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


  //error checkers
  isNameError: boolean = false;
  isDescError: boolean = false;
  isDateError: boolean = false;
  isSeatsError: boolean = false;
  isImageError: boolean = false;
  dateErrorMessage: string = "";

  ngOnInit(): void {

  }

  onDecrement() {
    this.onTextChanged();
    if (this.numberOfSeats > 0)
      this.numberOfSeats--;
  }

  onIncrement() {
    this.onTextChanged();
    this.numberOfSeats++;
  }

  onSubmit() {

    let isValid = this.inputValidation();
    console.log(isValid)
    if(isValid){
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
    this.onTextChanged();
  }

  onChange(event: any) {
   this.onTextChanged();
    this.image = event.target.files[0];
  }

  inputValidation(){

    if(this.eventname == undefined || this.eventname == " " ){
      this.isNameError = true;
      this.eventname = "";
      return false;
    }
    if(this.description == undefined || this.description == " " ){
      this.isDescError = true;
      this.description = "";
      return false;
    }
    if(new Date(this.date).getTime() < new Date().getTime()){

      this.dateErrorMessage = "Please enter a date greater than today";
      this.isDateError = true;
      this.date = "";
      return false;
    }
    if(this.date == undefined || this.date == " "){
      this.dateErrorMessage = "Please enter a valid date"
      this.isDateError = true;
      this.date = "";
      return false;
    }
    if(this.image == undefined){
      this.isImageError = true;
      this.image = "";
      return false;
    }
    if(this.numberOfSeats == 0){
      this.isSeatsError = true;
      this.numberOfSeats = 0;
      return false;
    }
    else{
      return true;
    }
  }

  onTextChanged(){
    this.isNameError = false;
    this.isDescError = false;
    this.isDateError = false;
    this.isSeatsError = false;
    this.isImageError = false;
  }
}

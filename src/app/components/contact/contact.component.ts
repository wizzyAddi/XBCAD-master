import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  fullname: string;
  email: string;
  subject: string;
  message: string;
  ngOnInit(): void {
  }

  onSubmit() {

    let isSent = this.contactService.SendContact({
      fullname: this.fullname,
      email: this.email,
      subject: this.subject,
      message: this.message
    })

    if(isSent)
      alert("Message has been sent");
    else
      alert('Message could not be sent');

    this.resetForm();
  }

  resetForm(){
    this.fullname = ""
    this.email = "";
    this.subject = ""
    this.message = "";
  }
}

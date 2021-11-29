import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private fireDatabase: AngularFireDatabase ) { }

  contacts: any[] = [];
  SendContact(contact: any){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dateString = `${year}-${(month + 1)}-${day}`;
    var ref = this.fireDatabase.database.ref(`ContactMessages/${dateString}`)

    try{
      ref.set(contact);
      return true;
    }catch(err){
      return false;
    }
  }

  GetContacts(){
    let index = 0;
    var ref = this.fireDatabase.database.ref('ContactMessages')

    ref.get().then(x => {

      x.forEach((contact) => {


        this.contacts[index] = {

          fullname: contact.val().fullname,
          email: contact.val().email,
          subject: contact.val().subject,
          message: contact.val().message

        }

        index++;
      })
    })

    return this.contacts;
  }
}

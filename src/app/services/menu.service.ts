import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MenuItem } from '../models/menu-item.model';
import { Upload } from '../models/upload';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private fireDatabase: AngularFireDatabase) { }

  menuItems: MenuItem[] = [];
  AddMenuItem(item: MenuItem) {

    let mainPath = item.Catagory;
    var fireRef = this.fireDatabase.database.ref(`MenuItems/${mainPath}/${item.Name}`);

    try {

        fireRef.set(item);

      return false
    } catch (err) {
      throw err
    }
  }

  GetItems(){

    let index = 0;


    try{

      let catagories = ['Breakfast', 'Lunch', 'Dinner'];

      catagories.forEach((cat) => {
        var ref = this.fireDatabase.database.ref(`MenuItems/${cat}`)
        ref.get().then((snapshot) => {
          snapshot.forEach((x) => {

            let item: MenuItem = {
              Catagory: x.key,
              Name: x.val().Name,
              Description: x.val().Description,
              Price: x.val().Price,
              ImagePath: x.val().ImagePath
            }
            this.menuItems[index] = item;
            index++;
          })
        })
      })

      return this.menuItems;
    }catch(err){
      throw err;
    }
  }
}

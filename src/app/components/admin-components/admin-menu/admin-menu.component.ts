import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item.model';
import { Upload } from 'src/app/models/upload';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private uploadService: UploadService) { }
  ItemCatagory: string;
  ItemName: string;
  ItemDescription: string;
  ItemPrice: number = null;
  image: any;
  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event.target.files[0])
    this.image = event.target.files[0];
  }

  onSubmit(){

    let upload = new Upload(this.image)

    let item: MenuItem = {
      Catagory: this.ItemCatagory,
      Name: this.ItemName,
      Description: this.ItemDescription,
      Price: this.ItemPrice,
      ImagePath: upload.file.name
    }


    let isAdded = this.uploadService.pushUpload(item, upload, false)

    if(isAdded){
      alert('Menu item added');
    }
    else{
      alert('Item could not be added');
    }

    this.resetForm();
  }

  resetForm(){
    this.ItemCatagory = "";
    this.ItemDescription = "";
    this.ItemName = "";
    this.ItemPrice = null;
    this.image = "";
  }
}

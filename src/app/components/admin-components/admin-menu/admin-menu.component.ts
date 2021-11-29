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

  //Error checkers
  isCatagoryError: boolean = false;
  isNameError: boolean = false;
  isDescError: boolean = false;
  isPriceError: boolean = false;
  isImageError: boolean = false;
  ngOnInit(): void {
  }

  onChange(event: any) {
    this.onTextChanged();
    this.image = event.target.files[0];
  }

  onSubmit() {


    let isValid = this.inputValidation();
    if (isValid) {
      let upload = new Upload(this.image)

      let item: MenuItem = {
        Catagory: this.ItemCatagory,
        Name: this.ItemName,
        Description: this.ItemDescription,
        Price: this.ItemPrice,
        ImagePath: upload.file.name
      }
      let isAdded = this.uploadService.pushUpload(item, upload, false)

      if (isAdded) {
        alert('Menu item added');
      }
      else {
        alert('Item could not be added');
      }
    }


    this.resetForm();
  }

  resetForm() {
    this.ItemCatagory = "";
    this.ItemDescription = "";
    this.ItemName = "";
    this.ItemPrice = null;
    this.image = "";
  }

  inputValidation() {

    if(this.ItemCatagory == undefined || this.ItemCatagory == ""){
      this.isCatagoryError = true;
      this.ItemCatagory = "";
      return false;
    }

    if (this.ItemName == undefined || this.ItemName == " ") {
      this.isNameError = true;
      this.ItemName = "";
      return false;
    }
    if (this.ItemDescription == undefined || this.ItemDescription == " ") {
      this.isDescError = true;
      this.ItemDescription = "";
      return false;
    }
    if (this.image == undefined || this.image == " ") {
      this.isImageError = true;
      this.image = "";
      return false;
    }
    if (this.ItemPrice == 0 ) {
      this.isPriceError = true;
      this.ItemPrice = 0;
      return false;
    }
    else {
      return true;
    }
  }


  onTextChanged(){
    this.isCatagoryError = false;
    this.isNameError = false;
    this.isDescError = false;
    this.isPriceError = false;
    this.isImageError = false;
  }
}

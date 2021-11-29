import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { Upload } from '../models/upload'
import * as firebase from 'firebase'
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators'
import { MenuItem } from '../models/menu-item.model';
import { MenuService } from './menu.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private eventService: EventService, private fireStorage: AngularFireStorage, private menuService: MenuService) { }
  private basePath: string = '/upload'
  private uploadTask: firebase.default.storage.UploadTask;
  url: any;

  async pushUpload(item: any, upload: Upload, isEvent: boolean) {

    try {
      let storageRef = this.fireStorage.storage.ref();
      this.uploadTask = await storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file).then(() => {
        this.getUpload(item ,item.ImagePath, isEvent);
      });
      return true;
    } catch (err) {
      throw err;
    }
  }

  getUpload(item: any ,path, isEvent: boolean) {
    setTimeout(()=>{
      this.requestDownload(item, path, isEvent)
    }, 2000)
    return this.url
  }

  requestDownload(item: any, path: any, isEvent:boolean) {
    let storageRef = this.fireStorage.storage.app.storage('raak-c10df.appspot.com');
    storageRef.ref(`${this.basePath}/${path}`).getDownloadURL().then((url) => {
      item.ImagePath = url;
      if(!isEvent)
        this.menuService.AddMenuItem(item);
      else
        this.eventService.AddEvent(item);
    }, (res) => {console.log(res)})
  }
}


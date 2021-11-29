import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item.model';
import { MenuService } from 'src/app/services/menu.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private menuService: MenuService, private uploadService: UploadService) { }

  menuItems: MenuItem[] = [];
  url: any
  isDoneLoading: boolean = false;
  ngOnInit(): void {
    this.menuItems = this.menuService.GetItems()
  }

  onFilter(filter: string){

  }
}

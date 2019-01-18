import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable()
export class SidebarService {

  menu: any = [];     

  constructor(
    public userService: UserService

  ) { }

  cargarMenu() {
    this.menu = this.userService.menu;
  }

}

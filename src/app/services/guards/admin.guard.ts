import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// Configuration
import { ADMIN_ROLE } from 'src/app/config/config';

// Services
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) {
  }

  canActivate() {
    if (this.userService.user.role === ADMIN_ROLE) {
      return true;
    }

    this.userService.logout();

    return false;
  }
}

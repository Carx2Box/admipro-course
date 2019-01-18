import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// Services
import { UserService } from '../user/user.service';
import { RENEW_TOKEN_HOUR } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ChecktokenGuard implements CanActivate {

constructor(
  public userService: UserService) {
}

  canActivate(): Promise<boolean> | boolean {

    // console.log('ChecktokenGuard activate?');
    const token = this.userService.token;
    const payload = JSON.parse( atob(token.split('.')[1]) );
    const expiredToken = !payload ? true : this.isTokenExpired(payload.exp);

    if (expiredToken) {
      this.userService.logout();
      return false;
    }

    return this.checkRenewToken(payload.exp);
  }

  checkRenewToken(exp: number ): Promise<boolean> {

    return new Promise((resolve, reject) => {
      const tokenExp  = new Date(exp * 1000);
      const now = new Date();
      now.setTime( now.getTime() + (RENEW_TOKEN_HOUR * 60 * 60 * 1000) );

      if (tokenExp.getTime() > now.getTime() ) {
        resolve(true);
      } else {
         this.userService.renewToken()
           .subscribe(
               (resp) => resolve(resp),
               (err) => reject(false));
      }
    });
  }

  isTokenExpired(exp: number) {
    const now  = new Date().getTime() / 1000;
    return now > exp;
  }
}

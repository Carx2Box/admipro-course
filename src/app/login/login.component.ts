import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/service.index';
import { GOOGLE_CLIENT_ID, LOGIN_ERROR_TITLE } from '../config/config';
import { ErrorService } from '../services/error/error.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  rememberpass: boolean = false;
  auth2: any;

  constructor(
    public userService: UserService,
    public errorService: ErrorService,
    private router: Router) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberpass = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      const token = googleUser.getAuthResponse().id_token;
      this.userService
        .loginGoogle(token)
        .subscribe(
          () => (window.location.href = '#/dashboard'),
          (error) => this.errorService.showError(LOGIN_ERROR_TITLE, error.error.message) );
    });
  }

  login(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const user = new User(null, f.value.email, f.value.password);

    this.userService
      .login(user, this.rememberpass)
      .subscribe(
         () => this.router.navigate(['/dashboard']),
         (error) =>  this.errorService.showError(LOGIN_ERROR_TITLE, error.error.message) );
  }
}

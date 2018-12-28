import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Models
import { User } from 'src/app/models/user.model';

// Configuration
import { URL_SERVICES } from 'src/app/config/config';

// Maps component
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

  constructor(private http: HttpClient,
    private router: Router ) { 
    console.log('User service is ready.')
    this.loadFromLocalStorage();
  }

  // Is Logged
  isLogged() {

    this.token = localStorage.getItem('token');
    if (!this.token)
      return false;


    return this.token.length > 5 ? true: false;
  }

  // New user
  createUser( user: User) {
    const url = URL_SERVICES+'/user';

    return this.http.post(url, user).pipe(map((resp: any)=> {
      return resp.user;
    }))
  }

  loginGoogle(token: string) {
    const url = URL_SERVICES+'/login/google' ;

    return this.http.post(url, {token: token}).pipe(map((resp: any)=> {
      this.saveToLocalStorage(resp);      
      localStorage.removeItem('email');
      return true;
    }));
  }

  // Login user
  login(user: User, remember: boolean)  {    

    if (remember) {
        localStorage.setItem('email', user.email);      
    } else {
      localStorage.removeItem('email');      
    }

    const url=  URL_SERVICES+ '/login';

    return this.http.post(url, user).pipe(map((resp: any)=> {
      this.saveToLocalStorage(resp);      
      return true;
    }));
  }

  // Login out
  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);    
  }

  // Save to tocalstorage the information of Login 
  private saveToLocalStorage(resp: any) {
    localStorage.setItem('id', resp.id);
    localStorage.setItem('token', resp.token);
    localStorage.setItem('user', JSON.stringify(resp.user));
    this.user = resp.user;
    this.token= resp.token;
  }

  // Load from local Storage
  private loadFromLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user  = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token ='';
      this.user = null;
    }
  }
}

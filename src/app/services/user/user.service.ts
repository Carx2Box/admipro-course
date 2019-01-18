import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import swal from 'sweetalert';

// Models
import { User } from 'src/app/models/user.model';

// Configuration
import { URL_SERVICES } from 'src/app/config/config';

// Maps component
import { UploadFileService } from '../upload/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;
  menu: any = [];

  constructor(private http: HttpClient,
    private router: Router,
    public uploadFileService: UploadFileService ) {
    this.loadFromLocalStorage();
  }

  // Is Logged
  isLogged() {

    this.token = localStorage.getItem('token');
    if (!this.token) {
      return false;
    }

    return this.token.length > 5 ? true : false;
  }

  // New user
  createUser( user: User) {
    const url = URL_SERVICES + '/user';

    return this.http.post(url, user).pipe(map((resp: any) => {
      return resp.user;
    }));
  }

  // Get Users
  retrieveUsers(from: number = 0) {
    const url = URL_SERVICES + `/user?fromRows=${from}`;

    return this.http.get(url);
  }

  // Remove user
  removeUser(user: User) {
    const url = URL_SERVICES + `/user/${user._id}`;
    const httpParams = new HttpParams().set('token',  this.token);

    return this.http.delete(url, { params: httpParams})
      .pipe(map(resp =>  {
        if (resp) {
          return true;
        }
      }));
  }

  // Search for name
  retrieveUserForName(term: string) {
    const url = URL_SERVICES + `/search/collection/users/${encodeURIComponent(term)}`;

    return this.http.get(url)
      .pipe(map( (resp: any) =>  resp.users ));
  }

  // Update user
  updateUser( user: User) {
    const url = `${URL_SERVICES}/user/${encodeURIComponent(user._id)}`;
    const httpParams = new HttpParams().set('token',  this.token);
    const token = this.token;

    return this.http.put(url, user, { params: httpParams}).pipe(map((resp: any) =>  {

      if (user._id === this.user._id) {
        this.saveToLocalStorage(user._id, token, user, this.menu);
      }
      return resp.user;
    }));
  }

  // Change image user
  changeImageUser(file: any, id: string) {

    const token = this.token;
    this.uploadFileService
      .uploadFile(file, 'users', id)
      .then( (resp: any) =>  {
        this.user.img = resp.user.img;
        swal('Image updated', this.user.name, 'success');
        this.saveToLocalStorage(id, token, this.user, this.menu);
      });
  }

  // Login google
  loginGoogle(token: string) {
    const url = URL_SERVICES + '/login/google' ;
    return this.http.post(url, {token: token}).pipe(map((resp: any) => {
      console.log(resp);
      this.saveToLocalStorage(resp.id, resp.token, resp.user, resp.menu);
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

    const url =  URL_SERVICES + '/login';

    return this.http.post(url, user)
      .pipe(map((resp: any) => {
      this.saveToLocalStorage(resp.id, resp.token, resp.user, resp.menu );
      return true;
    }));
  }

  // Login out
  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  // Save to tocalstorage the information of Login
  private saveToLocalStorage(id, token, user, menu) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  // Load from local Storage
  private loadFromLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user  = JSON.parse(localStorage.getItem('user'));
      this.menu  = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }
}

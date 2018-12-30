import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

// Models
import { User } from 'src/app/models/user.model';

// Configuration
import { URL_SERVICES } from 'src/app/config/config';

// Maps component
import { UploadFileService } from '../upload/upload-file.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

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

  // Update user
  updateUser( user: User) {
    const url = `${URL_SERVICES}/user/${this.user._id}`;
    const httpParams = new HttpParams().set('token',  this.token);
    const token = this.token;

    return this.http.put(url, user, { params: httpParams}).pipe(map((resp: any) => {
      this.saveToLocalStorage(user._id, token, user);
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
        this.saveToLocalStorage(id, token, this.user);
      })
      .catch(resp => {
        console.log( resp);
      });
  }

  // Login google
  loginGoogle(token: string) {
    const url = URL_SERVICES + '/login/google' ;
    return this.http.post(url, {token: token}).pipe(map((resp: any) => {
      this.saveToLocalStorage(resp.id, resp.token, resp.user);
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

    return this.http.post(url, user).pipe(map((resp: any) => {
      this.saveToLocalStorage(resp.id, resp.token, resp.user);
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
  private saveToLocalStorage(id, token, user) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  // Load from local Storage
  private loadFromLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user  = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }
}

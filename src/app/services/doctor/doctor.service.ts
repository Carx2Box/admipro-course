import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Configuration
import { URL_SERVICES } from 'src/app/config/config';

// Models
import { Doctor } from '../../models/doctor.model';

// Services
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) { }

  retrieveDoctors(from: number = 0)  {
    const url = URL_SERVICES + `/doctor?fromRows=${from}`;

    return this.http.get(url);
  }

  retrieveDoctor(id: string) {
    const url = URL_SERVICES + `/doctor/${id}`;

    return this.http.get(url)
      .pipe(map((res: any)=> {
        console.log(res);
        return res;
      }))
    ;
  }

  createDoctor(doctor: Doctor) {
    const url = URL_SERVICES + '/doctor';
    const httpParams = new HttpParams().set('token',  this.userService.token);

    return this.http.post(url, doctor, { params: httpParams }).pipe(map((resp: any) => {
      return resp.doctor;
    }));
  }

  retrieveDoctorsForName(term: string) {
    const url = URL_SERVICES + `/search/collection/doctors/${encodeURIComponent(term)}`;

    return this.http.get(url);
  }

  updateDoctor( doctor: Doctor) {
    const url = `${URL_SERVICES}/doctor/${encodeURIComponent(doctor._id)}`;
    const httpParams = new HttpParams().set('token',  this.userService.token);  
    doctor.user = this.userService.user._id;

    return this.http.put(url, doctor, { params: httpParams}).pipe(map((resp: any) =>  {
      return resp.doctor;
    }));
  }

  removeDoctor(id: string) {
    const url = URL_SERVICES + `/doctor/${id}`;
    const httpParams = new HttpParams().set('token',  this.userService.token);

    return this.http.delete(url, { params: httpParams})
      .pipe(map(resp =>  {
        if (resp) {
          return true;
        }
      }));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Configuration
import { URL_SERVICES } from 'src/app/config/config';

// Models
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
    public userService: UserService) { }

  retrieveHospitals(from: number = 0, limit: number= 5 )  {
    const url = URL_SERVICES + `/hospital?fromRows=${from}&limit=${limit}`;

    return this.http.get(url);
  }


  retrieveHospital(id: string) {
    const url = URL_SERVICES + `/hospital/${id}`;

    return this.http.get(url)
      .pipe(map((res: any) => res.hospital));
  }

  removeHospital(id: string) {
    const url = URL_SERVICES + `/hospital/${id}`;
    const httpParams = new HttpParams().set('token',  this.userService.token);

    return this.http.delete(url, { params: httpParams})
      .pipe(map(resp =>  {
        if (resp) {
          return true;
        }
      }));
  }

  createHospital(name: string) {
    const url = URL_SERVICES + '/hospital';
    const httpParams = new HttpParams().set('token',  this.userService.token);
    const hospital = new Hospital(name);

    return this.http.post(url, hospital, { params: httpParams }).pipe(map((resp: any) => {
      return resp.hospital;
    }));
  }

   retrieveHospitalForName(term: string) {
    const url = URL_SERVICES + `/search/collection/hospitals/${encodeURIComponent(term)}`;

    return this.http.get(url);
  }

   // Update user
   updateHospital( hospital: Hospital) {
    const url = `${URL_SERVICES}/hospital/${encodeURIComponent(hospital._id)}`;
    const httpParams = new HttpParams().set('token',  this.userService.token);

    return this.http.put(url, hospital, { params: httpParams}).pipe(map((resp: any) =>  {
      return resp.hospital;
    }));
  }
}

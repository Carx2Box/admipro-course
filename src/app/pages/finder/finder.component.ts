import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Doctor } from 'src/app/models/doctor.model';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styles: []
})
export class FinderComponent implements OnInit {
  loadingPage: boolean = false;
  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadingPage = true;
    this.activatedRoute.params
        .subscribe(params => {
          this.search(params['term']);
        });
  }

  search(term: string) {
    const url = URL_SERVICES + `/search/all/${term}`;

    this.http.get(url)
      .subscribe((response: any) => {
        // console.log(response);
        this.hospitals = response.hospitals;
        this.users = response.users;
        this.doctors = response.doctors;
        this.loadingPage = false;
      });
  }
}

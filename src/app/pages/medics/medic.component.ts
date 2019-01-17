import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Models
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

// Services
import { HospitalService } from '../../services/hospital/hospital.service';
import { DoctorService } from '../../services/doctor/doctor.service';

import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medics',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {
  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    private router: Router) { }

  ngOnInit() {
    this.loadHospitals();
  }

  saveDoctor(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.doctorService.createDoctor(this.doctor)
      .subscribe(doctor => {
        console.log(doctor);
        swal('Created doctor', doctor.name, 'success' ).then( res => {
          this.doctor._id = doctor._id;
          this.router.navigate(['/doctor', doctor._id ]);
        });
      });
  }

  loadHospitals() {
    this.hospitalService.retrieveHospitals(0, 99999)
      .subscribe((res: any) => {
        this.hospitals = res.hospitals;
      });
  }

  changeHospital(event: any) {

    if (!event.target.value) {
      this.hospital = new Hospital('', '', '');
      return;
    }

    const hospitalId = event.target.value;

    this.hospitalService.retrieveHospital(hospitalId)
      .subscribe((data: any) => {
        this.hospital = new Hospital(data.name, data.img, data.id);
      });
  }
}

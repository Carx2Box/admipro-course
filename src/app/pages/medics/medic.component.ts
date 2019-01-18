import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Models
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

// Services
import { HospitalService } from '../../services/hospital/hospital.service';
import { DoctorService } from '../../services/doctor/doctor.service';

import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {
  loadingPage: boolean = false;
  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {

    this.loadingPage = true;
    this.activatedRouter.params.subscribe(params => {
      const doctorId = params['id'];
      if (doctorId !== 'new') {
        this.doctorService.retrieveDoctor(doctorId)
          .subscribe((resp: any) =>  {
            this.doctor =  new Doctor(resp.doctor.name, resp.doctor.hospital._id, resp.doctor.img, resp.doctor._id, resp.doctor.user);
            this.loadHospital(resp.doctor.hospital._id);
            this.loadingPage = false;
          });
      } else {
        this.loadingPage = false;
      }
    });

    this.loadHospitals();
  }

  showModal(id: string) {
    this.modalUploadService.showModal('doctors', id);

    this.modalUploadService.notification
      .subscribe( res => {
        this.doctor.img = res.doctor.img;
      });
  }

  saveDoctor(f: NgForm) {
    if (f.invalid) {
      return;
    }

    if (this.doctor._id === '') {
      this.doctorService.createDoctor(this.doctor)
        .subscribe(doctor => {
          // console.log(doctor);
          swal('Created doctor', doctor.name, 'success' ).then( res => {
            this.doctor._id = doctor._id;
            this.router.navigate(['/doctor', doctor._id ]);
          });
        });
    } else {
      this.doctorService.updateDoctor(this.doctor)
        .subscribe(doctor =>  {
          swal('Updated doctor', doctor.name, 'success' ).then( res => {
            this.doctor._id = doctor._id;
          });
        });
    }
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
    this.loadHospital(hospitalId);
  }

  loadHospital(hospitalId: string) {
    this.hospitalService.retrieveHospital(hospitalId)
    .subscribe((data: any) => {
      this.hospital = new Hospital(data.name, data.img, data.id);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: []
})
export class MedicsComponent implements OnInit {
  loadingPage: boolean = false;
  totalRecords = 0;
  from: number = 0;
  searcherName: boolean = false;
  disableNext: boolean = false;
  disablePrevious: boolean = false;
  doctors: any[] = [];

  constructor(
    public doctorService: DoctorService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadDoctors();
  }

  IsNullEmptyUndefinedValue(value) {
    return (value === null || value === '' || value === undefined);
  }

  showModal(id: string) {
    this.modalUploadService.showModal('doctors', id);

    this.modalUploadService.notification
      .subscribe( res => {
        console.log(res);
        const doctorSelected: Doctor = this.doctors.find(doctor => doctor._id === res.doctor._id);
        if (doctorSelected) {
          doctorSelected.img = res.doctor.img;
        }
      });
  }

  changeFrom(increment) {
    const fromTemp = this.from + increment;

    if (fromTemp >= this.totalRecords) {
      return;
    }

    if (fromTemp < 0) {
      return;
    }

    this.from = fromTemp;
    this.loadDoctors();
  }

  statusNavigation(fromUI) {
    this.disableNext = false;
    this.disablePrevious = false;

    if (fromUI - 5 < 0) {
      this.disablePrevious = true;
    }

    if (fromUI + 5 >= this.totalRecords) {
      this.disableNext = true;
    }
  }

  loadDoctors() {
    this.loadingPage = true;
    const fromUI = this.from;

    this.doctorService.retrieveDoctors(this.from)
      .subscribe((resp: any) =>  {
        this.doctors = resp.doctors;
        this.totalRecords = resp.rows;
        this.loadingPage = false;
        this.statusNavigation(fromUI);
      });
  }

  searchDoctor(term: string) {

    if (this.IsNullEmptyUndefinedValue(term)) {
      this.searcherName = false;
      this.from = 0;
      this.loadDoctors();
      return;
    }

    this.loadingPage = true;
    this.searcherName = true;
    this.doctorService.retrieveDoctorsForName(term)
      .subscribe((resp: any) =>  {
        this.doctors = resp.doctors;
        this.totalRecords = resp.rows;
        this.loadingPage = false;
      });
  }

  createDoctor() {
  }

  editDoctor(doctor: Doctor) {
    console.log(doctor);
  }

  removeDoctor(doctor: Doctor) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this ' + doctor.name + ' doctor!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( deleteDoctor => {
      if (deleteDoctor) {
        this.doctorService.removeDoctor(doctor._id).subscribe(deletedUserReponse => {
          if (deletedUserReponse) {
            this.searcherName = false;
            this.loadDoctors();
          }
        });
      }
    });
  }
}

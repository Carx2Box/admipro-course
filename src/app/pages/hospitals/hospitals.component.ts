import { Component, OnInit } from '@angular/core';

// Models
import { Hospital } from '../../models/hospital.model';

// Services
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {
  loadingPage: boolean = false;
  totalRecords = 0;
  hospitals: Hospital[] = [];
  from: number = 0;
  searcherName: boolean = false;
  disableNext: boolean = false;
  disablePrevious: boolean = false;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadHospitals();
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

  changeFrom(increment: number) {
    const fromTemp = this.from + increment;

    if (fromTemp >= this.totalRecords) {
      return;
    }

    if (fromTemp < 0) {
      return;
    }

    this.from = fromTemp;
    this.loadHospitals();
  }

  IsNullEmptyUndefinedValue(value) {
    return (value === null || value === '' || value === undefined);
  }

  searchHospital(term: string) {

    if (this.IsNullEmptyUndefinedValue(term)) {
      this.searcherName = false;
      this.from = 0;
      this.loadHospitals();
      return;
    }

    this.loadingPage = true;
    this.searcherName = true;
    this.hospitalService.retrieveHospitalForName(term)
      .subscribe((resp: any) =>  {
        this.hospitals = resp.hospitals;
        this.totalRecords = resp.rows;
        this.loadingPage = false;
      });
  }

  showModal(id: string) {
    this.modalUploadService.showModal('hospitals', id);

    this.modalUploadService.notification
      .subscribe( res => {
        // console.log(res);
        const hospitalSelected: Hospital = this.hospitals.find(hospital => hospital._id === res.hospital._id);
        if (hospitalSelected) {
          hospitalSelected.img = res.hospital.img;
        }
      });
  }

  saveHospital(hospital: Hospital) {
    // console.log(hospital);
    if (hospital.name === '') {
        swal('Can not update hospital', 'The name of the hospital is required.', 'error');
        return;
     }

     this.hospitalService.updateHospital(hospital)
       .subscribe(resp => {
        swal('Hospital updated', hospital.name, 'success');
       } );
  }

  removeHospital(hospital: Hospital) {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this ' + hospital.name + ' hospital!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( deleteHospital => {

      if (deleteHospital) {

        if (this.hospitals.length === 1 ) {
          this.changeFrom(-5);
          return;
        }

        this.hospitalService.removeHospital(hospital._id).subscribe(deletedUser => {
          if (deletedUser) {
            this.searcherName = false;
            this.loadHospitals();
          }
        });
      }
    });
  }

  loadHospitals() {
    this.loadingPage = true;
    const fromUI = this.from;

    this.hospitalService.retrieveHospitals(this.from)
      .subscribe((resp: any) =>  {
        this.hospitals = resp.hospitals;
        this.totalRecords = resp.rows;
        this.loadingPage = false;
        this.statusNavigation(fromUI);
      });
  }

  createHospital() {

    swal({
      title: 'New hospital',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Hospital name...',
          type: 'text',
        },
      },
    }).then(resp => {
       if (!resp) {
        swal('Can not create hospital', 'The name of the hospital is required.', 'error');
        return;
       }

        this.hospitalService.createHospital(resp)
          .subscribe( hospital => {
            swal('Hospital created', hospital.name, 'success').then((result) => {
              this.loadHospitals();
            });
          });
    });
  }
}

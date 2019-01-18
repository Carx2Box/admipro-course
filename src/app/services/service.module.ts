import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { DoctorService } from './doctor/doctor.service';

// tslint:disable-next-line:max-line-length
import { SettingsService, SidebarService, SharedService, UserService, LoginGuardGuard, UploadFileService,  AdminGuard, ErrorService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    HospitalService,
    DoctorService,
    LoginGuardGuard,
    AdminGuard,
    UploadFileService,
    ModalUploadService,
    ErrorService,
  ],
  declarations: []
})
export class ServiceModule { }

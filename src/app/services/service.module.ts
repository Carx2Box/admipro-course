import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { DoctorService } from './doctor/doctor.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuardGuard,
  UploadFileService
 } from './service.index';

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
    UploadFileService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }

import { Injectable } from '@angular/core';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  showError( title: string, message: string ) {
    swal(title, message, 'error');
  }
}


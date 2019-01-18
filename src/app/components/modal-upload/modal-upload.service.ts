import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;
  public hidden: string = 'hidden';
  public notification = new EventEmitter<any>();

  constructor() {
    // console.log('Modal upload service');
  }

  hideModal() {
    this.hidden = 'hidden';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string) {
    this.hidden = '';
    this.id = id;
    this.type = type;
  }
}

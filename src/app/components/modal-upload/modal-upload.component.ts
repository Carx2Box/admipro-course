import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadFileService } from '../../services/upload/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  @ViewChild('inputUploadFile') inputUploadFile: ElementRef;
  uploadImage = File;
  tempImage: any;

  constructor(
    public uploadFileService: UploadFileService,
    public modalUploadService: ModalUploadService ) {
  }

  ngOnInit() {
  }

  uploaderImage(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No exists file.');
        return;
      }

      const pattern = /image-*/;
      if (!file.type.match(pattern)) {
        reject('Incorrect format o file (only allow image).');
        return;
      }

    const reader = new FileReader();
    reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
}

  selectionImage(file) {
    this.uploaderImage(file)
    .then(data => {
      this.tempImage = data;
      this.uploadImage = file;
      this.inputUploadFile.nativeElement.value = '';
    }).catch(error => {
      this.tempImage = null;
      swal('Only allowed image', error, 'error');
    });
  }

  isUploadDisabled() {
    const uploadCurrentImage: any = this.uploadImage;

    if ( uploadCurrentImage === null ||  uploadCurrentImage.size === null || uploadCurrentImage.size === undefined) {
      return true;
    }

    return false;
  }

  changeImage() {
    this.uploadFileService
      .uploadFile(this.uploadImage, this.modalUploadService.type, this.modalUploadService.id)
      .then( resp =>  {
        this.modalUploadService.notification.emit(resp);
        this.closeModal();
      })
      .catch( err => {
        console.error(err);
      });
  }

  closeModal() {
    this.tempImage = null;
    this.uploadImage = null;
    this.modalUploadService.hideModal();
  }
}

import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() {
  }

  uploadFile(archive: File, type: string, id: string) {

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('image', archive, archive.name);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            resolve( JSON.parse(xhr.response));
          } else {
            console.error('Error to upload image', xhr.response);
            reject(JSON.parse(xhr.response));
          }
        }
      };

      const url = URL_SERVICES + '/upload/' + type + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}

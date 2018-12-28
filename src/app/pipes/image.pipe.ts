import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: any, type: string ='users'): any {  

    let url= URL_SERVICES +"/img"

    if (!image) {
      return url +'/users/xxxxxxxxxxxx';
    }

    if (image.indexof('https') >= 0) {
      return image;
    }

    return `${url}/${type}/${image}`;    
  }
}

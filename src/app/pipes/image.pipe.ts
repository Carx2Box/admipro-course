import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type: string = 'users'): any {

    const url = URL_SERVICES + '/img';

    if (!image) {
      return url + '/users/_user_test_';
    }

    if (image.indexOf('https') >= 0) {
      return image;
    }

    return `${url}/${type}/${image}`;
  }
}

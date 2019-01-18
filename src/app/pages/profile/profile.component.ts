import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Model
import { User } from '../../models/user.model';

// Service
import { UserService } from '../../services/user/user.service';

// Alert.
import swal from 'sweetalert';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadImage = File;
  tempImage: any;

  constructor(
    public userService: UserService,
    public errorService: ErrorService) {
    this.user = this.userService.user;
    this.tempImage = null;
  }

  ngOnInit() {
  }

  saveProfile(usuario: User) {

    this.user.name = usuario.name;
    if (!this.user.google) {
      this.user.email = usuario.email;
    }

    this.userService.updateUser(this.user)
      .subscribe((resp) => {

        if (resp) {
          swal('User update', resp.name, 'success');
        }
      },
      (error) => this.errorService.showError(error.error.message, error.error.errors.message));
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
    }).catch(error => {
      this.tempImage = null;
      swal('Only allowed image', error, 'error');
    });
  }

  isUploadDisabled() {
    const uploadCurrentImage: any = this.uploadImage;

    if (uploadCurrentImage.size === null || uploadCurrentImage.size === undefined) {
      return true;
    }

    return false;
  }

  changeImage() {
    this.userService.changeImageUser(this.uploadImage, this.user._id);
    this.user = this.userService.user;
  }
}

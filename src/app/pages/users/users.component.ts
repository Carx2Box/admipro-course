import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user/user.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  from: number = 0;
  totalRecords: number = 0;
  loadingPage: boolean = false;
  searcherName: boolean = false;
  disableNext: boolean = false;
  disablePrevious: boolean = false;

  constructor(
    public userService: UserService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadUsers();

    this.modalUploadService.notification
      .subscribe( res => {
        // console.log(res);
        const userSelected: User = this.users.find(user => user._id === res.user._id);
        if (userSelected) {
          userSelected.img = res.user.img;
        }
      });
  }

  showModal(id: string) {
    this.modalUploadService.showModal('users', id);
  }

  loadUsers() {

   this.loadingPage = true;
   const fromUI = this.from;

    this.userService.retrieveUsers(this.from)
      .subscribe((resp: any) => {
        this.totalRecords = resp.rows;
        this.users = resp.users;
        this.loadingPage = false;
        this.statusNavigation(fromUI);
      });
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
    this.loadUsers();
  }

  searchUsers(term?: string) {
    if  (this.IsNullEmptyUndefinedValue(term)) {
          this.searcherName = false;
          this.from = 0;
          this.loadUsers();
          return;
    }

    this.loadingPage = true;
    this.searcherName = true;
    this.userService.retrieveUserForName(term)
      .subscribe((users: any) => {
        this.users = users;
        this.loadingPage = false;
      },  error => {
        // console.log(error);
      });
  }

  saveUser(user: User) {
    this.userService.updateUser(user)
      .subscribe(userSave =>  {
        swal('Usuario actualizado', user.name, 'success');
      });
  }

  removeUser(user: User) {

    if (user._id === this.userService.user._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this ' + user.name + ' user!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( deleteUser => {

      if (deleteUser) {
        this.userService.removeUser(user).subscribe(deletedUser => {
          if (deletedUser) {

            if (this.users.length === 1 ) {
              this.changeFrom(-5);
              return;
            }

            this.searcherName = false;
            this.loadUsers();
          }
        });
      }
    });
  }

  IsNullEmptyUndefinedValue(value) {
    return (value === null || value === '' || value === undefined);
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
}

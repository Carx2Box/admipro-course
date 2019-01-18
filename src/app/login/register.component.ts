import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Models
import { User } from '../models/user.model';

// Services
import { UserService } from '../services/service.index';

// Alerts
import swal from 'sweetalert';
import { ErrorService } from '../services/error/error.service';
import { CREATED_USER_ERROR_TITLE } from '../config/config';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(
    public userService: UserService,
    public errorService: ErrorService,
    public router: Router) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      conditions: new FormControl(false),
    }, { validators: this.isEqual('password', 'password2') });
  }

  createUser() {
    if (this.forma.invalid) {
      return;
    }

    // Alert for no check the conditions.
    if (!this.forma.value.conditions) {
      swal('Important', 'You must click in the conditions!', 'warning');
      return;
    }

    const userAdd = new User(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    );

    this.userService.createUser(userAdd)
      .subscribe(resp => {
        swal('Ok', 'The user was generated correctly!', 'success')
          .then(value => { this.router.navigate(['/login']); }
          );
      },
      (error => {
        console.log(error);
        const errorShow: any = error.error;
        this.errorService.showError( errorShow.message,  errorShow.errors.message);
      }));
  }

  // Custom validation
  isEqual(field1: string, field2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if (pass1 === pass2 && pass1 !== null) {
        return null;
      }

      return { isEqual: true };
    };
  }
}

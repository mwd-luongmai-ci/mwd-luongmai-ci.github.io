import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { atLeastFourAlphabeticValidator, atLeastOneNonAlphabeticValidator, matchPassword } from '@app/_helpers/validators';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { AlertService, AuthenticationService, UserService } from '@app/_services';

@Component({ templateUrl: 'change_password.component.html' })
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to login if not logged in
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      oldpassword: ['', [Validators.required, Validators.minLength(8)]],
      newpassword: ['', [Validators.required,
      Validators.minLength(8),
      atLeastOneNonAlphabeticValidator(),
      atLeastFourAlphabeticValidator()]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {
        validators: matchPassword()
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService.changePassword(this.currentUser.id.toString(),
      this.form.get('oldpassword').value,
      this.form.get('newpassword').value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Password updated successfully.', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

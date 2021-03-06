import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldSpecifications } from '@shared/specs';
import { AlertService, UserService } from '@core/services';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', FieldSpecifications.Password]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.loading = true;
    const token = this.route.snapshot.paramMap.get('token');
    const passwordObject = {
      password: this.f.password.value,
      resetToken: token,
    };

    this.userService.resetPassword(passwordObject)
       .pipe(first())
       .subscribe(() => {
               this.alertService.success('Your password has been reset.', true);
               this.router.navigate(['/login']);
            },
            error => {
                 this.alertService.error(error);
                 this.loading = false;
            });
  }
}

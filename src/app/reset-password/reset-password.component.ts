import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { atLeastFourAlphabeticValidator, atLeastOneNonAlphabeticValidator } from '@app/_helpers/validators';
import { AlertService, UserService } from '@app/_services';
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
      password: ['', [Validators.required, Validators.minLength(8), atLeastOneNonAlphabeticValidator(), atLeastFourAlphabeticValidator()]]
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
    const passwordObject = {
      password: this.f.password.value,
    };

    const token = this.route.snapshot.paramMap.get('token');
    this.userService.resetPassword(passwordObject, token)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Your password has been reset.', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

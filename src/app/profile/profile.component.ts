import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { AlertService, AuthenticationService, UserService } from '@app/_services';
import { JsonConvert } from 'json2typescript';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  updateProfileForm: FormGroup;
  loading = false;
  submitted = false;
  jsonConvert: JsonConvert;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
    this.jsonConvert = new JsonConvert;
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit() {
    this.updateProfileForm = this.formBuilder.group({
      id: ['']
    });
    this.loadProfileData();
  }

  get f() {
    return this.updateProfileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateProfileForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.update(this.updateProfileForm.value)
      .subscribe(
        data => {
          this.alertService.success('Profile updated successfully.', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.submitted = false;
          this.loading = false;
        });
  }

  private loadProfileData(): void {
    this.loading = true;
    this.userService.getById(this.currentUser.id)
      .pipe(first())
      .subscribe(
        user => {
          this.updateProfileForm.setValue(
            {
              id: user.id,
              name: !!user.name ? user.name : '',
              bio: !!user.bio ? user.bio : '',
              company: !!user.company ? user.company : '',
              location: !!user.location ? user.location : ''
            });
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.submitted = false;
          this.loading = false;
        });
  }
}

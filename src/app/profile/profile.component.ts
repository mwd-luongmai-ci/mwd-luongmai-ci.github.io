import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AlertService, UserService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { first, tap } from 'rxjs/operators';
import { debug } from 'util';
import { Observable } from 'rxjs';
import { emptyValidator } from '@app/_helpers/validators';
import { JsonConvert, JsonProperty } from 'json2typescript';

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
      if ( !this.authenticationService.currentUserValue ) {
        this.router.navigate(['/login']);
      }
      this.jsonConvert = new JsonConvert;
      this.authenticationService.currentUser.subscribe(x => {
        this.currentUser = x;
      });
    }

  ngOnInit() {
    this.updateProfileForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(255), emptyValidator()]],
      bio: ['', [Validators.required, Validators.maxLength(255), emptyValidator()]],
      company: ['', [Validators.required, Validators.maxLength(50), emptyValidator()]],
      location: ['', [Validators.required, Validators.maxLength(100), emptyValidator()]]
    });
    this.loadProfileData();
  }

  get f() {
    return this.updateProfileForm.controls;
  }

  private onSubmit() {
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
          name: user.name,
          bio: user.bio == null || user.bio == undefined ? '' : user.bio,
          company: user.company == null || user.company == undefined ? '' : user.company,
          location: user.location == null || user.location == undefined ? '' : user.location
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

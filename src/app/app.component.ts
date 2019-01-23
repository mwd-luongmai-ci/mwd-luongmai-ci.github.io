import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@core/models';
import { AuthenticationService } from '@core/services';

@Component({ selector: 'app-swatang', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['auth/login']);
  }
}

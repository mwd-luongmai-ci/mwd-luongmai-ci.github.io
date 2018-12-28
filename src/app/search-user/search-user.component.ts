import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AlertService, UserService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { first, tap } from 'rxjs/operators';
import { debug } from 'util';
import { Observable } from 'rxjs';
import { emptyValidator } from '@app/_helpers/validators';
import { JsonConvert } from 'json2typescript';
import { Constants } from '@app/_helpers';
import { SearchMethod } from '@app/_helpers/enum';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  searchUserForm: FormGroup;
  submitted = false;
  jsonConvert: JsonConvert;
  users: User[];
  isNotFound = false;
  isShowResult = false;
  searchMethodSelected = SearchMethod.Name;
  maxLengthSearch = Constants.MAX_LENGTH_SEARCH;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) {
      if ( !!this.authenticationService.currentUserValue ) {
        this.router.navigate(['/login']);
      }
      this.jsonConvert = new JsonConvert;
    }

  ngOnInit() {
    this.searchUserForm = this.formBuilder.group({
      keyword: ['', [Validators.required]],
      searchMethod: [SearchMethod.Name]
    });
    this.users = [];
  }

  get f() {
    return this.searchUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.searchUserForm.invalid) {
      this.isShowResult = false;
      return;
    }

    const keyValue = this.f.keyword.value;
    const searchMethod = this.f.searchMethod.value;

    if (keyValue) {
      this.userService.search(this.processSearchInput(keyValue), searchMethod)
      .subscribe(
        users => {
          this.users = users;
          this.isShowResult = true;
          if (this.users.length === 0) {
            this.isNotFound = true;
          } else {
            this.isNotFound = false;
          }
        },
        error => {
            this.alertService.error(error);
            this.submitted = false;
            this.isShowResult = false;
        });
    }
  }

  processSearchInput(keyValue: string): string {
    let searchKeyword = keyValue;

    if (searchKeyword.length > this.maxLengthSearch) {
      searchKeyword = searchKeyword.substr(0, this.maxLengthSearch);
      this.f.keyword.setValue(searchKeyword);
    }

    searchKeyword = encodeURIComponent(searchKeyword);

    return searchKeyword;
  }
}

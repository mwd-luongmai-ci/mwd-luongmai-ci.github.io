import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'app-company-input-form-control',
  templateUrl: './company.component.html'
})
export class CompanyComponent extends BaseControlComponent {

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);

    this.name = 'company';
    this.label = 'Company';
    this.control = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  }
}

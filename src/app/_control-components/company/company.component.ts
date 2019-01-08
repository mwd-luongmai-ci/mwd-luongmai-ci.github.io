import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-company-input-form-control',
  templateUrl: './company.component.html'
})
export class CompanyComponent extends BaseFormControlComponent {

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);

    this.name = 'company';
    this.label = 'Company';
    this.control = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  }
}

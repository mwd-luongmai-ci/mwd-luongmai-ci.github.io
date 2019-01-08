import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-bio-input-form-control',
  templateUrl: './bio.component.html'
})
export class BioComponent extends BaseFormControlComponent{

  @Input()
  rows: number = 1;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);

    this.name = 'bio';
    this.label = 'Bio';
    this.control = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  }
}

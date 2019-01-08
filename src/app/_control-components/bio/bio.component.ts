import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'app-bio-input-form-control',
  templateUrl: './bio.component.html'
})
export class BioComponent extends BaseControlComponent{

  @Input()
  rows: number = 1;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);

    this.name = 'bio';
    this.label = 'Bio';
    this.control = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  }
}

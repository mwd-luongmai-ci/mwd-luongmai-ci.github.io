import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-location-input-form-control',
  templateUrl: './location.component.html'
})
export class LocationComponent extends BaseFormControlComponent {

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);

    this.name = 'location';
    this.label = 'Location';
    this.control = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  }
}

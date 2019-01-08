import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'app-name-input-form-control',
  templateUrl: './name.component.html'
})
export class NameComponent extends BaseControlComponent {

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);

    this.name = 'name';
    this.label = 'Name';
    this.control = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  }
}

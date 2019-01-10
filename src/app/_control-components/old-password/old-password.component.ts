import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-old-password-input-form-control',
  templateUrl: './old-password.component.html'
})
export class OldPasswordComponent extends BaseFormControlComponent {

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);

    this.name = 'oldpassword';
    this.label = 'Old password';
    this.control = new FormControl('', [Validators.required]);
  }
}

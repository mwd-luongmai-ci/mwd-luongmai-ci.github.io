import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-old-password-input-form-control',
  templateUrl: './old-password.component.html'
})
export class OldPasswordComponent extends BaseFormControlComponent {

    constructor() {
        super('oldpassword', 'Old Password');
    }
}

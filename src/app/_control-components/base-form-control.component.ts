import { Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export abstract class BaseFormControlComponent implements OnInit {

  formControl: FormControl;
  nameControl: string;
  labelControl: string;

  @Input()
  submitted = false;

  @Input()
  parentGroup: FormGroup;

  constructor( public formBuilder: FormBuilder ) {}

  ngOnInit(): void {
    this.addControl();
  }

  set control(formControl: FormControl) {
    this.formControl = formControl;
  }

  set name(name: string) {
    this.nameControl = name;
  }

  set label(label: string) {
    this.labelControl = label;
  }

  get controlGroup() {
    return this.parentGroup.controls;
  }

  addControl() {
    if (!!this.nameControl && !!this.formControl) {
      this.parentGroup.addControl(this.nameControl, this.formControl);
    }
  }
}

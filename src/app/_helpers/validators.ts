import { ValidatorFn, AbstractControl } from '@angular/forms';

export function atLeastOneNonAlphabeticValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const rex = new RegExp('[^a-zA-Z]+');
        const isValid = rex.test(control.value);
        return isValid ? null : {'atLeastOneNonAlphabetic': {value: control.value}};
    };
}

export function atLeastFourAlphabeticValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
      const rex = new RegExp('[a-zA-Z]{4,}');
      const isValid = rex.test(control.value);
      return isValid ? null : {'atLeastFourAlphabetic': {value: control.value}};
  };
}

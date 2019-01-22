import { ValidatorFn, AbstractControl } from "@angular/forms";

const USER_NAME_MIN_LENGTH = 6;
const USER_NAME_PATTERN = new RegExp('^[a-zA-Z0-9]+$');
const NAME_MAX_LENGTH = 50;
const COMPANY_MAX_LENGTH = 50;
const EMAIL_PATTERN = new RegExp('^[^@]+@[^@]+$');
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_NONALPHABETIC_PATTERN = new RegExp('[^a-zA-Z]+');
const PASSWORD_ALPHABETIC_PATTERN = new RegExp('[a-zA-Z]{4,}');

export class FieldSpecs {

  static usernameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const username = control.value.trim();

      const usernameRequired = !username;
      const usernameMinLength = username.length < USER_NAME_MIN_LENGTH;
      const usernamePattern = !USER_NAME_PATTERN.test(username);

      if (usernameRequired) {
        return { usernameRequired }
      }
      return { usernameRequired, usernameMinLength, usernamePattern }
  }

  static fieldRequiredValidator(validatorName: string, trimValue = true): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let value = control.value;
      if (trimValue) {
        value = value.trim();
      }
      const result: {[key: string]: any} = {};
      result[validatorName] = !value;
      return result;
    }
  }
  
  static nameValidator(control: AbstractControl): {[key: string]: any} | null {
    const name = control.value.trim();

    const nameRequired = !name;
    const nameMaxLength = name.length > NAME_MAX_LENGTH;

    if (nameRequired) {
      return { nameRequired };
    }
    return { nameRequired, nameMaxLength };
  }

  static companyValidator(control: AbstractControl): {[key: string]: any} | null {
    const company = control.value.trim();

    const companyRequired = !company;
    const companyMaxLength = company.length > COMPANY_MAX_LENGTH;

    if (companyRequired) {
      return { companyRequired };
    }
    return { companyRequired, companyMaxLength };
  }

  static emailValidator(control: AbstractControl): {[key: string]: any} | null {
    const email = control.value.trim();
    const emailRequired = !email;
    const emailPattern = !EMAIL_PATTERN.test(email);

    if (emailRequired) {
      return { emailRequired };
    }
    return { emailRequired, emailPattern };
  }

  static passwordValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.value;
    const passwordRequired = !password;
    const passwordAlphabeticChars = !PASSWORD_ALPHABETIC_PATTERN.test(password);
    const passwordNonAlphabetucChars = !PASSWORD_NONALPHABETIC_PATTERN.test(password);
    const passwordMinLength = password.length < PASSWORD_MIN_LENGTH;

    if (passwordRequired) { 
      return { passwordRequired } 
    }
    return { passwordRequired, passwordAlphabeticChars, passwordNonAlphabetucChars, passwordMinLength };
  }
}
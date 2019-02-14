import { Validators } from '@angular/forms';
import { FieldValidators } from '../validation/field-validator';
import { FieldSpecs } from '../validation/field-spec';

export class FieldSpecifications {
  static EmailAddress = [FieldSpecs.fieldRequiredValidator('emailRequired'), FieldValidators.emailAddress()];
  static Password = [
    FieldSpecs.fieldRequiredValidator('passwordRequired'),
    FieldValidators.atLeastFourAlphabeticValidator(),
    Validators.minLength(8),
    FieldValidators.atLeastOneNonAlphabeticValidator()
  ];
  static SimplePassword = [FieldSpecs.fieldRequiredValidator('passwordRequired'), Validators.minLength(8)];
  static Username = [FieldSpecs.fieldRequiredValidator('usernameRequired'), Validators.minLength(6), FieldValidators.username()];
  static Name = [FieldSpecs.fieldRequiredValidator('nameRequired'), Validators.maxLength(50)];
  static Company = [FieldSpecs.fieldRequiredValidator('companyRequired'), Validators.maxLength(50)];
  static Location = [FieldSpecs.fieldRequiredValidator('profileLocationRequired'), Validators.maxLength(100)];
  static Bio = [FieldSpecs.fieldRequiredValidator('profileBioRequired'), Validators.maxLength(255)];
}

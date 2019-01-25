import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { BioComponent } from './components/bio/bio.component';
import { CompanyComponent } from './components/company/company.component';
import { EmailComponent } from './components/email/email.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LocationComponent } from './components/location/location.component';
import { NameComponent } from './components/name/name.component';
import { PasswordComponent } from './components/password/password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from './components/validation.messages/validation.messages.component';
import { FormTextComponent } from './components/form-text/form-text.component';
import { OldPasswordComponent } from '@app/shared/components/old-password/old-password.component';

@NgModule({
  declarations: [
    AlertComponent,
    BioComponent,
    CompanyComponent,
    EmailComponent,
    LoadingComponent,
    LocationComponent,
    NameComponent,
    PasswordComponent,
    ValidationMessagesComponent,
    FormTextComponent,
    OldPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    AlertComponent,
    BioComponent,
    CompanyComponent,
    EmailComponent,
    LoadingComponent,
    LocationComponent,
    NameComponent,
    PasswordComponent,
    ValidationMessagesComponent,
    FormTextComponent,
    OldPasswordComponent,
  ]
})
export class SharedModule { }

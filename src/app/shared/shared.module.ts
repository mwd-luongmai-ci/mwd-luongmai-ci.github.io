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
import { ReactiveFormsModule } from '@angular/forms';
import { OldPasswordComponent } from '@app/shared/components/old-password/old-password.component';
import { CustomMaterialModule } from '@app/core';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    OldPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
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
    OldPasswordComponent,
    CustomMaterialModule,
  ]
})
export class SharedModule { }

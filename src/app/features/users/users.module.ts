import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { SharedModule } from '@app/shared';
import { CustomMaterialModule } from '@app/core';

@NgModule({
  declarations: [
    ChangePasswordComponent,
    DeleteAccountComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SearchUserComponent,
  ],
  imports: [
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CustomMaterialModule,
  ]
})
export class UsersModule { }

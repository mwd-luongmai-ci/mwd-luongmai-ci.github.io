import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards';
import { ChangePasswordComponent } from './change_password';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ForgotPasswordComponent } from './forgot-password';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { RegisterComponent } from './register';
import { ResetPasswordComponent } from './reset-password';
import { SearchUserComponent } from './search-user/search-user.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'change_password', component: ChangePasswordComponent },
  { path: 'profile/delete', component: DeleteAccountComponent },
  { path: 'search-user', component: SearchUserComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ChangePasswordComponent } from './change_password';
import { AuthGuard } from './_guards';
import { ProfileComponent } from './profile';
import { SearchUserComponent } from './search-user/search-user.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'change_password', component: ChangePasswordComponent },
    { path: 'profile/delete', component: DeleteAccountComponent },
    { path: 'search-user', component: SearchUserComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

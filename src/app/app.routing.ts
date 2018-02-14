import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {EnsureAuthenticated} from './components/auth/services/ensure-authenticated.service';
import {VerifyComponent} from './components/verify-page/verify.component';
import {LoginRedirect} from './components/auth/services/login-redirect.service';
const appRoutes: Routes = [
    {
        path: 'admin',
        component: AuthComponent,
        canActivate: [LoginRedirect],
        loadChildren: './components/auth/auth.module#AuthModule',
    },
    {
        path: 'admin/dashboard',
        component: DashboardComponent,
        canActivate: [EnsureAuthenticated],
        loadChildren: './components/dashboard/dashboard.module#DashboardModule',
    },

    {
        path: 'admin/emailconfirmation/:id',
        component: VerifyComponent,
    },
    {
        path: '**',
        redirectTo: 'admin/dashboard',

    }
];

export const routing = RouterModule.forRoot(appRoutes);
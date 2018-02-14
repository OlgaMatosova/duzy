import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RegisterConfirmComponent} from './register/register-confirm/register-confirm.component';
import {ResetConfirmComponent} from './request-reset-password/reset-confirm/reset-confirm.component';
import {LoginRedirect} from './services/login-redirect.service';
import {RequestPasswordComponent} from './request-reset-password/request-reset-password.component';
import {RequestVerifyComponent} from './request-verify-link/request-verify-link.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginRedirect]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginRedirect]
    },
    {
        path: 'register/success',
        component: RegisterConfirmComponent,
        canActivate: [LoginRedirect]
    },
    {
        path: 'reset-passwors/success',
        component: ResetConfirmComponent,
        canActivate: [LoginRedirect]
    },
    {
        path: 'request-reset-password',
        component: RequestPasswordComponent,
        canActivate: [LoginRedirect]
    },
    {
        path: 'request-verify-link',
        component: RequestVerifyComponent,
        canActivate: [LoginRedirect]
    },
    {
        path: 'reset-password/:id',
        component: ResetPasswordComponent,
        canActivate: [LoginRedirect]
    }
];


export const authRouting = RouterModule.forChild(authRoutes);
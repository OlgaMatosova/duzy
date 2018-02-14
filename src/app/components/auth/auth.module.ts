import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';
import {AuthComponent} from './auth.component';
import {authRouting} from './auth.routing';
import { LoginRedirect } from './services/login-redirect.service';
import { RequestPassModule } from './request-reset-password/request-reset-password.module';
import { RequestVerifyModule } from './request-verify-link/request-verify-link.module';
import { ResetPassModule } from './reset-password/reset-password.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        authRouting,
        LoginModule,
        RegisterModule,
        RequestPassModule,
        ResetPassModule,
        RequestVerifyModule
    ],
    declarations: [
        AuthComponent
    ],
    providers: [LoginRedirect],
    exports: [AuthComponent]
})
export class AuthModule {}
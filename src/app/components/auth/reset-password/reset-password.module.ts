import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {HttpModule} from '@angular/http';
import {ResetPasswordComponent} from './reset-password.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {SharedComponentModule} from '../../shared/sharedComponent.module';

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MatButtonModule,
        SharedComponentModule
    ],
    providers: [AuthService],
})
export class ResetPassModule {}

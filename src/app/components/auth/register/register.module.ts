import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {HttpModule} from '@angular/http';
import {RegisterComponent} from './register.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {SharedComponentModule} from '../../shared/sharedComponent.module';
import {RegisterConfirmComponent} from './register-confirm/register-confirm.component';

@NgModule({
    declarations: [
        RegisterComponent,
        RegisterConfirmComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MatButtonModule,
        SharedComponentModule,
        RouterModule
    ],
    providers: [AuthService],
})
export class RegisterModule {}

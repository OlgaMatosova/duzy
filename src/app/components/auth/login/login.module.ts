import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {HttpModule} from '@angular/http';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {SharedComponentModule} from '../../shared/sharedComponent.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MatButtonModule,
        RouterModule,
        SharedComponentModule,
        MatCheckboxModule
    ],
    providers: [AuthService]
})
export class LoginModule {}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {HttpModule} from '@angular/http';
import {RequestVerifyComponent} from './request-verify-link.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {SharedComponentModule} from '../../shared/sharedComponent.module';

@NgModule({
    declarations: [
        RequestVerifyComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MatButtonModule,
        RouterModule,
        SharedComponentModule
    ],
    providers: [AuthService]
})
export class RequestVerifyModule {}

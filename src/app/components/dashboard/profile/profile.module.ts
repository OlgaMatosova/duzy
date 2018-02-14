import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {SharedComponentModule} from '../../shared/sharedComponent.module';
import {ProfileService} from './service/profile.service';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        RouterModule,
        SharedComponentModule
    ],
    providers: [ProfileService]
})
export class ProfileModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ProfileModule,
            providers: [ProfileService],
        };
    }
}
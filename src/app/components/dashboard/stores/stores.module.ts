import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {SharedComponentModule} from '../../shared/sharedComponent.module';
import {StoresComponent} from './stores.component';
import {AddStoreComponent} from './add-store/add-store.component';
import {MatTabsModule} from '@angular/material/tabs';
import { StoreComponent } from './store/store.component';

@NgModule({
    declarations: [
        StoresComponent,
        AddStoreComponent,
        StoreComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        RouterModule,
        SharedComponentModule,
        MatTabsModule
    ],
    providers: []
})
export class StoresModule {}
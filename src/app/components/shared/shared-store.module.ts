import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {StoresService} from '../dashboard/stores/service/stores.service';
@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule
    ],
    providers: [StoresService]
})
export class SharedStoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedStoreModule,
            providers: [StoresService],
        };
    }
}


import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {routing} from './app.routing';
import {AppComponent} from './app.component';
import {AuthModule} from './components/auth/auth.module';
import {DashboardModule} from './components/dashboard/dashboard.module';
import {EnsureAuthenticated} from './components/auth/services/ensure-authenticated.service';
import {MatDialogModule} from '@angular/material/dialog';
import {ProfileModule} from './components/dashboard/profile/profile.module';
import {SharedStoreModule} from './components/shared/shared-store.module';
import {VerifyComponent} from './components/verify-page/verify.component';


@NgModule({
    declarations: [
        AppComponent,
        VerifyComponent,        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AuthModule,
        DashboardModule,
        MatDialogModule,
        ProfileModule.forRoot(),
        SharedStoreModule.forRoot(),
        routing,
    ],
    providers: [
        EnsureAuthenticated
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

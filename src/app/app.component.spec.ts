import {TestBed, async, } from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {SharedStoreModule} from './components/shared/shared-store.module';
import {AuthModule} from './components/auth/auth.module';
import {RouterTestingModule} from '@angular/router/testing';
import {DashboardModule} from './components/dashboard/dashboard.module';
import {EnsureAuthenticated} from './components/auth/services/ensure-authenticated.service';
import {ProfileModule} from './components/dashboard/profile/profile.module';
import {VerifyComponent} from './components/verify-page/verify.component';
describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                VerifyComponent
            ],
            imports: [
                SharedStoreModule.forRoot(),
                AuthModule,
                DashboardModule, BrowserModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                ProfileModule.forRoot()
            ],
            providers: [EnsureAuthenticated]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy(); 
    }));
});

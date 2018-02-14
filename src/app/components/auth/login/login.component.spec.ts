import {TestBed, async, inject, fakeAsync, tick, ComponentFixture} from '@angular/core/testing';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedComponentModule} from '../../shared/sharedComponent.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material';
import {LoginComponent} from './login.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import {Router} from '@angular/router';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let service: AuthService;
    let dialog: MatDialog;
    let fixture: ComponentFixture<LoginComponent>;
    let el: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                FormsModule,
                SharedComponentModule,
                MatCheckboxModule,
                RouterTestingModule,
                NoopAnimationsModule
            ],
            providers: [AuthService]
        }).compileComponents();

    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        service = TestBed.get(AuthService);
        el = fixture.debugElement.query(By.css('app-button'));
    }));
    //
    it('should be created', () => {
        expect(component).toBeTruthy();
    });
    //
    it('Button is created', fakeAsync(() => {
        expect(el.nativeElement.textContent.trim()).toBe('sign in');
    }));
    //
    it('should call the server when user login', fakeAsync(inject([Router], (router: Router) => {
        let spyService = spyOn(service, 'login').and.returnValue(Promise.resolve({
            "data": {
                "view":
                {"token": "S1iVoa08f"}
            }
        }));
        const spy = spyOn(router, 'navigateByUrl');
        component.onLogin();

        expect(spyService).toHaveBeenCalled();
    })));

    it('should add new token to local storage', fakeAsync(inject([Router], (router: Router) => {
        let service = TestBed.get(AuthService);
        let spyServe = spyOn(service, 'login').and.returnValue(
            Promise.resolve({
                "data": {
                    "view":
                    {"token": "S1iVoa08f"}
                }
            }));
        const spy = spyOn(router, 'navigateByUrl');
        component.onLogin();
        fixture.detectChanges();
        tick();
        expect(component.token).toBe('S1iVoa08f');
    })));

    xit('should show server error ', fakeAsync(() => {
        let service = TestBed.get(AuthService);
        let spyServe = spyOn(service, 'login').and.returnValue(
            Promise.reject({

            }));

        component.onLogin();
        fixture.detectChanges();
        tick();

        expect(spyServe.calls.any()).toEqual(false);
    }));

    it('login invalid when empty', () => {
        const inputDe = fixture.debugElement.query(By.css('input[name="login"]'));
        const inputEl = inputDe.nativeElement.validity.valid;
        expect(inputEl).toBeFalsy();
    });
    
    it('login invalid when length biger then 30 simbols', () => {
        const inputDe = fixture.debugElement.query(By.css('input[name="login"]'));
        const inputEl = inputDe.nativeElement;
        inputEl.value = '11111111111111111111111111111111111';
        const inputElValidity = inputEl.validity.valid;
        expect(inputElValidity).toBeFalsy();
    });
    it('login invalid when length smaller then 8 simbols', () => {
        const inputDe = fixture.debugElement.query(By.css('input[name="login"]'));
        const inputEl = inputDe.nativeElement;
        inputEl.value = '1111';
        const inputElValidity = inputEl.validity.valid;
        expect(inputElValidity).toBeFalsy();
    });

    it('password invalid when empty', () => {
        const inputDe = fixture.debugElement.query(By.css('input[name="password"]'));
        const inputEl = inputDe.nativeElement.validity.valid;
        expect(inputEl).toBeFalsy();
    });
});

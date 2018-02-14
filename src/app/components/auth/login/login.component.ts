import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../../../models/user';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MatDialog} from '@angular/material';
import { FormGroup } from '@angular/forms';
import {DialogOverview} from '../../common/dialogOverview/dialogOverview.component';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('popOverState', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            transition('show => hide', animate('200ms ease-out')),
            transition('hide => show', animate('200ms ease-in'))
        ])
    ]
})
export class LoginComponent {
    user: User = new User();
    public errorList: string;
    public show: string;
    serverError: string;
    public showPassword: boolean;
    token:string = '';
    @ViewChild("loginF")  form: any;
    @ViewChild("password") inputChild: ElementRef;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        private auth: AuthService) {
        let idVerification = route.snapshot.params['id'];

        if (idVerification) {
            this.auth.checkVerifyCode({'code': idVerification})
                .then((resp) => {
                    this.dialog.open(DialogOverview, {
                        width: '550px',
                        data: {
                            header: 'Verification',
                            body: 'Your email was verified',
                            buttons: 'one'
                        }
                    });

                })

                .catch((err) => {
                    let errorMess = err.json()['errors']['main']

                    this.dialog.open(DialogOverview, {
                        width: '550px',
                        data: {
                            header: 'Verification is failed',
                            body: errorMess,
                            buttons: 'one'
                        }
                    });
                });
        }
    }

    ngOnInit() {
        if(!this.isOS()){
            document.getElementById("login").focus();
        }
    }

    isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    onLogin(): void {
        let scope = this;
        this.auth.login(this.user)
            .then((resp) => {
                if (resp.data.view.token) {
                     scope.token = resp.data.view.token;
                     if (scope.user['remember']) {
                        localStorage.setItem('token', scope.token);
                        localStorage.setItem('remember', 'true');
                    } else {
                        let date = new Date();
                        date.setDate(date.getDate() + 1);
                        document.cookie = "token=" + scope.token + "; path=/; expires=" + date.toUTCString();
                    }
       
                    this.router.navigateByUrl('/admin/dashboard/promos');
                }
            })
            .catch((err) => {
                localStorage.removeItem('token');
                let errors = JSON.parse(err['_body']);
                this.show = 'show';
                this.serverError = errors.errors.main;
            });
    }

    checkValidity(login?: any, pass?:any, form?: any) {
        
        if (login) {
            let error = (login.invalid && (login.pending || login.touched || form.submitted)
                || pass.invalid && (pass.pending || pass.touched || form.submitted)
            ) ? 'show' : 'hide';
            if (error == 'hide') {
                if (this.show) {
                    return 'show';
                }
            }
            return error;
        }
    }

    submitEnter(event:any) {
        if (event.keyCode == 13) {
            this.onLogin();
        }
    }

}
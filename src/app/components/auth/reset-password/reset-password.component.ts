import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../../../models/user';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-set-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
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
export class ResetPasswordComponent {
    user: User = new User();
    idVerification :string;
    public show: string;
    serverError: any;
    constructor(private route: ActivatedRoute,
        public dialog: MatDialog,
        private router: Router,
        private auth: AuthService) {
        this.idVerification = route.snapshot.params['id'];
    }
    onReset(): void {
        let pass = this.user.password;

        this.auth.resetPass(this.idVerification, pass)
            .then((resp) => {
                this.router.navigateByUrl('/admin/dashboard/promos');
                if (resp.data.view.token) {
                    localStorage.setItem('token', resp.data.view.token);
                    localStorage.setItem('remember', 'true');
                    this.router.navigateByUrl('/admin/dashboard/promos');
                }
            })
            .catch((err) => {
                let errorMess = err.json()['errors']['main']
                this.show = 'show';
                this.serverError = errorMess;
            });
    }


    checkValidity(pass: any, confirm: any, form: any) {
        let error = (pass.invalid && (pass.pending || pass.touched || form.submitted)
            || confirm.invalid && (confirm.pending || confirm.touched || form.submitted)) ? 'show' : 'hide';
        if (error == 'hide') {
            if (this.show) {
                return 'show';
            }
        }
        return error;
    }
}

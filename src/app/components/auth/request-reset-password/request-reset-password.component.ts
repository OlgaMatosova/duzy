import {Component} from '@angular/core';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {AuthService} from '../services/auth.service';
@Component({
    selector: 'app-request-reset-password',
    templateUrl: './request-reset-password.component.html',
    styleUrls: ['./request-reset-password.component.scss'],
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
export class RequestPasswordComponent {
    user: User = new User();
    public show: string;
    serverError: any;
    constructor(private auth: AuthService, private router: Router,) {}

    onSendReset(): void {
        this.auth.requestResetPass(this.user)
            .then(() => {
                this.router.navigateByUrl('/admin/reset-passwors/success');
            })
            .catch((err) => {
                let errorMess = err.json()['errors']['main']
                this.show = 'show';
                this.serverError = errorMess;
            });
    }

    
    checkValidity(email?: any, form?: any) {
        if (email) {
            let error = (email.invalid && (email.pending || email.touched || form.submitted)
            ) ? 'show' : 'hide';
            if (error == 'hide') {
                if (this.show) {
                    return 'show';
                }
            }
            return error;
        }
    }
}

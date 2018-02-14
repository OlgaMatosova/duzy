import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../../../models/user';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
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
export class RegisterComponent {
    user: User = new User();
    regDone : boolean = false;
    serverError: any;
    show: any;
    constructor(private router: Router, private auth: AuthService) {}

    onRegister(): void {
        this.auth.register(this.user)
            .then(() => {
                this.regDone = true;
                this.router.navigateByUrl('/admin/register/success');
            })
            .catch((err) => {
                localStorage.removeItem('token');
                let errors = JSON.parse(err['_body']);
                this.show = 'show';
                this.serverError =  errors.errors.main;
            });
    }

    checkValidity(login: any, pass: any, confirm: any, form: any) {
         let error =  (login.invalid && (login.pending || login.touched || form.submitted)
            || pass.invalid && (pass.pending || pass.touched || form.submitted)
            || confirm.invalid && (confirm.pending || confirm.touched || form.submitted)) ? 'show' : 'hide';
            if (error == 'hide') {
                if (this.show) {
                    return 'show';
                }
            }
            return error;
    }
}
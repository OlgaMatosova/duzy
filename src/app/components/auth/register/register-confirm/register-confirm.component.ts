import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'register-confirm',
    templateUrl: './register-confirm.component.html',
    styleUrls: ['./register-confirm.component.scss'],
 })
export class RegisterConfirmComponent {
     constructor(private router: Router) {}
}
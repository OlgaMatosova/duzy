import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'reset-confirm',
    templateUrl: './reset-confirm.component.html',
    styleUrls: ['./reset-confirm.component.scss'],
 })
export class ResetConfirmComponent {
     constructor(private router: Router) {}
}
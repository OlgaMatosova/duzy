import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {ProfileService} from './service/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../../models/profile';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
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
export class ProfileComponent implements OnInit {
    user: any;
    public errorList: any;
    editModeValue: boolean = false;
    private show: boolean;
    sub: any;
    profile: Profile = new Profile();
    oldProf: any;
    showSuccessChange = 'hide';
    showPassChange = 'hide';
    showProfileError: any;
    showResetError: any;
    @ViewChild('passF') passF: any;
    @ViewChild('profileF') profileF: any;

    newPassword = '';
    constructor(
        public element: ElementRef,
        private activateRoute: ActivatedRoute,
        private profileService: ProfileService) {
    }

    ngOnInit() {
        this.profile = this.activateRoute.snapshot.data['profile']['data']['view'];
        this.oldProf = Object.assign({}, this.profile);
    }

    editMode() {
        let inputs = this.element.nativeElement.querySelectorAll('input');
        this.editModeValue = true;
        inputs.forEach((input: any) => {
            if (input.getAttribute('type') == 'text') input.removeAttribute('readonly');
        });
    }

    saveProfile() {

        let inputs = this.element.nativeElement.querySelectorAll('input');
        inputs.forEach((input: any) => {
            if (input.getAttribute('type') == 'text') input.setAttribute('readonly', 'readonly');
        });
        this.editModeValue = false;

        this.profileService.updateProfile(this.profile).subscribe(data => {
            if (this.profile.email != this.oldProf.email) {
                this.showSuccessChange = 'show';
                setTimeout(() => {
                    this.showSuccessChange = 'hide';
                }, 4000);
                this.profile.email = this.oldProf.email;
            }
            this.profileService.profile.next(this.profile);
        },
            errors => {
                this.showProfileError = errors['errors']['main'];
            });
    }

    changePass() {
         this.profileService.updateProfile({
            ...this.profile,
            ...this.passF.value
        }).subscribe(data => {

            this.showPassChange = 'show';
            setTimeout(() => {
                this.showPassChange = 'hide';
            }, 4000);
            this.passF.resetForm();

        }, error => {
            this.showResetError = error['errors']['main'];
        });
    }

    checkValidity(email?: any, firstName?: any, lastName?: any, form?: any) {
        if (email) {
            let error = (email.invalid && (email.pending || email.touched || form.submitted)
                || firstName.invalid && (firstName.pending || firstName.touched || form.submitted)
                || lastName.invalid && (lastName.pending || lastName.touched || form.submitted)
            ) ? 'show' : 'hide';
            if (error == 'hide') {
                 if (error == 'hide') {
                if (this.showProfileError) {
                    return 'show';
                }
            }
            }
            return error;
        }
    }

    checkValidityPass(pass: any, newPass: any, confirm: any, form: any) {
        let error = (pass.invalid && (pass.pending || pass.touched || form.submitted)
            || newPass.invalid && (newPass.pending || newPass.touched || form.submitted)
            || confirm.invalid && (confirm.pending || confirm.touched || form.submitted)
        ) ? 'show' : 'hide';
        if (error == 'hide') {
              if (error == 'hide') {
                if (this.showResetError) {
                    return 'show';
                }
            }
        }
        return error;
    }

    ngOnDestroy() {

    }

    cancel() {
        this.profile = this.oldProf;
        let inputs = this.element.nativeElement.querySelectorAll('input');
        inputs.forEach((input: any) => {
            if (input.getAttribute('type') == 'text') input.setAttribute('readonly', 'readonly');
        });

        this.editModeValue = false;
    }
}

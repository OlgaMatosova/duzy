import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {MatDialog} from '@angular/material';

import {DialogOverview} from '../common/dialogOverview/dialogOverview.component';
@Component({
    selector: 'verify-page',
    templateUrl: './verify.component.html',

})
export class VerifyComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        private auth: AuthService) {
        let idVerification = route.snapshot.params['id'];

        if (idVerification) {
            this.auth.checkVerifyCode({'code': idVerification})
                .then((resp) => {
                    let dialogRef = this.dialog.open(DialogOverview, {
                        width: '550px',
                        data: {
                            header: 'Verification',
                            body: 'Your email was verified',
                            buttons: 'one'
                        }
                    });

                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            this.router.navigateByUrl('/admin/login');
                        }
                    });
                })
                .catch((err) => {
                    let errorMess = err.json()['errors']['main']

                    let dialogRef = this.dialog.open(DialogOverview, {
                        width: '550px',
                        data: {
                            header: 'Verification is failed',
                            body: errorMess,
                            buttons: 'one'
                        }
                    });

                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            this.router.navigateByUrl('/admin/login');
                        }
                    });
                });
        }
    }

    ngOnInit() {}
}
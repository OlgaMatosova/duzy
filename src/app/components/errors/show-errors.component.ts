import {Component, Input} from '@angular/core';
import {AbstractControlDirective, AbstractControl} from '@angular/forms';

@Component({
    selector: 'show-errors',
    template: `
        <ul  *ngIf="shouldShowErrors()">
          <li class="errorLine" *ngFor="let error of listOfErrors()">{{error}}</li>
        </ul>`,
    styleUrls: ['./show-error.component.scss'],
})
export class ShowErrorsComponent {
    private static readonly errorMessages = {
        'required': (params: any, name: string) => name + ' is required',
        'minlength': (params: any, name: string) => 'The min number of characters is ' + params.requiredLength,
        'maxlength': (params: any, name: string) => 'The max allowed number of characters is ' + params.requiredLength,
        'pattern': (params: any, name: string) => name,
        'uniqueName': (params: any) => params.message,
        'validateEqual': () => 'Password and confirm password entries do not match'
    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;
    @Input()
    private form: any;
    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors && (this.form.submitted ||
                (this.control.pending || this.control.touched));
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control['name']));
    }

    private getMessage(type: string, params: any, name: any) {

        if (type == "required") {
            switch (name) {
                case 'confirmPassword':  // if (x === 'value1')
                    name = 'Confirm password';
                    break
                case 'newPassword':  // if (x === 'value1')
                    name = 'New password';
                    break
                case 'storeName':  // if (x === 'value1')
                    name = 'Store name';
                    break
                case 'login':  // if (x === 'value1')
                    name = 'Email';
                    break
                case 'storeUrl':  // if (x === 'value1')
                    name = 'Store url';
                    break
                case 'storeApiKey':  // if (x === 'value1')
                    name = 'Storefront access token';
                    break
            }
        }
        if (type == "pattern") {
            switch (name) {
                case 'firstName':  // if (x === 'value1')
                    name = 'Please use Latin alphabet';
                    break
                case 'lastName':  // if (x === 'value1')
                    name = 'Please use Latin alphabet';
                    break
                case 'login':  // if (x === 'value1')
                    name = 'Incorrect email format';
                    break
                case 'email':  // if (x === 'value1')
                    name = 'Incorrect email format';
                    break
            }
        }
        return ShowErrorsComponent.errorMessages[type](params, name);
    }
}
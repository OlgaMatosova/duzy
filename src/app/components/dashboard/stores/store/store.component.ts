import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {StoresService} from './../service/stores.service';
import {DialogOverview} from '../../../common/dialogOverview/dialogOverview.component';
import {MatDialog} from '@angular/material';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Store} from '../../../../models/store';
@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss'],
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
export class StoreComponent implements OnInit {

    @Input() store: Store = new Store();
    @Input() index: number;
    @Output() deleteStore = new EventEmitter<any>();
    
    editModeValue: boolean = false;
    serverError: string;
    oldStore: Store;
    text: string;
    constructor(
        private storesService: StoresService,
        public element: ElementRef,
        public dialog: MatDialog) {}

    ngOnInit() {}

    deleteItem(id: any, index:number) {
        let scope = this;

        let dialogRef = this.dialog.open(DialogOverview, {
            width: '550px',
            data: {
                header: 'Delete store',
                body: 'The store and all associated promos will be deleted and no longer available. Are you sure?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                scope.storesService.deleteStore(id).subscribe((resp) => {
                    this.deleteStore.emit(index);
                }, (err) => {
                    console.log(err);
                });
            }
        });
    }

    editStore(store: any) {

        this.storesService.editStore({'name': store.name}, store['_id']).subscribe(
            () => {
                let inputs = this.element.nativeElement.querySelectorAll('input');
                inputs.forEach((input: any) => {
                    input.setAttribute('readonly', 'readonly');
                });
                this.editModeValue = false;

            }, (errors) => {
                this.serverError = errors['errors']['main'];
                console.log(this.serverError);
            },
        );
    }

    editMode(editModeValue: boolean) {

        if (editModeValue) {
            this.oldStore = Object.assign({}, this.store);
            let inputs = this.element.nativeElement.querySelectorAll('input');
            this.editModeValue = editModeValue;
            inputs.forEach((input: any) => {
                input.removeAttribute('readonly');
            });
        } else {
            this.store = this.oldStore;
            let inputs = this.element.nativeElement.querySelectorAll('input');
            inputs.forEach((input:any) => {
                input.setAttribute('readonly', 'readonly');
            });
            this.editModeValue = editModeValue;
        }
    }

    checkValidity(storeName?:any, form?:any) {
        let error = (
            storeName.invalid && (storeName.pending || storeName.touched || form.submitted)           
        ) ? 'show' : 'hide';
        if (error == 'hide') {
            if (this.serverError) {
                return 'show';
            }
        }
        return error;
    }
}

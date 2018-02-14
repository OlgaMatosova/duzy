import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-previews',
    templateUrl: './previews.component.html',
    styleUrls: ['./previews.component.scss']
})
export class PreviewsComponent implements OnInit {

    @Input() previewsList: any;
    @Output() changePreview = new EventEmitter<any>();
    selectedPreview: any;
    constructor() {}

    ngOnInit() {}

    chooseImage(value: any) {
        this.selectedPreview = value;
        this.changePreview.emit(value);
    }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.scss']
})
export class ButtonComponent implements OnInit {
    @Input() styleBtn: string;
    @Input() disabled: boolean;
    disable: string;
    constructor() { }

    ngOnInit() {
        if(this.disabled){
            this.disable = 'disabled'
        }
    }
}

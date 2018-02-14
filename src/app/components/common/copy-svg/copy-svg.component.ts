import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-copy-svg',
    templateUrl: './copy-svg.component.html',
    styleUrls: ['./copy-svg.component.scss']
})
export class CopySvgComponent implements OnInit {
    @Input() copySting: string;
    constructor() {}

    ngOnInit() {}

    copyToBuffer(context: any) {
        let textArea = document.createElement("textarea");
        textArea.style.fontSize = '16px';
        textArea.style.fontSizeAdjust = '100%';
        textArea.setAttribute('readonly', 'readonly');
        textArea.value = context;
        document.body.appendChild(textArea);

        textArea.addEventListener("focus", function (e) {
            textArea.style.fontSize = "16px";
          });


        var range,
            selection;

        if (this.isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
            
        } else {
            textArea.select();
        }


        document.execCommand('copy');
        document.body.removeChild(textArea);
    }



    isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

}

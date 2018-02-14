import {Component, OnInit} from '@angular/core';
import {
    Ng4FilesStatus,
    Ng4FilesService,
    Ng4FilesConfig,
    Ng4FilesSelected
} from '../../ng4-files';
import {VideoService} from '../videos/videos.service';
import {MatDialog} from '@angular/material';
import {DialogOverview} from '../../../common/dialogOverview/dialogOverview.component';
@Component({
    selector: 'app-new-promo',
    templateUrl: './new-promo.component.html',
    styleUrls: ['./new-promo.component.scss'],
    providers: []
})

export class NewPromoComponent implements OnInit {
    public selectedFiles: any[] = [];
    public _id: any;
    public percent: any;
    hide: boolean;
    wrongFile: any[] = [];
    constructor(private videoService: VideoService, private ng4FilesService: Ng4FilesService, public dialog: MatDialog) {}

    private testConfig: Ng4FilesConfig = {
        acceptExtensions: ['png', 'mp4', 'MP4', 'flv', 'mpeg-4', 'avi', 'wmv', 'mov', 'jpg', 'jpeg']
    };

    filesSelect(selectedFiles: Ng4FilesSelected): void {
        this.wrongFile = [];

        for (let i = 0; i < selectedFiles.files.length; i++) {
            let file = selectedFiles.files[i];
            if (file['status'] == 4) {
                this.wrongFile.push(file);
            } else {
                this.selectedFiles.unshift(file);
            }
        }
    }

    ngOnInit() {
        this.ng4FilesService.addConfig(this.testConfig);
    }

    onChanged(value: boolean) {
        this.hide = value;
    }

    ngOnDestroy() {}

    onDelete(value: any, i: number) {
        let scope = this;
        let dialogRef = this.dialog.open(DialogOverview, {
            width: '550px',
            data: {
                header: 'Delete promo',
                body: 'This promo with all items will be deleted and become unavailable in all online resources. Are you sure?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                scope.videoService.deletePromo(value).subscribe(data => {
                    this.selectedFiles.splice(i, 1);
                });
            }
        });
    }
}

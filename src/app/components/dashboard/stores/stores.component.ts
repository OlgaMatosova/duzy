import {Component, OnInit, ElementRef} from '@angular/core';
import {StoresService} from './service/stores.service';
declare var Tour: any;
@Component({
    selector: 'app-stores',
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.scss'],
    providers: []
})
export class StoresComponent implements OnInit {
    public storeList: any[];
    showServerError: boolean;
    showSuccess = false;
    clearForm = false;
    editModeValue: boolean = false;
    public enjoyhint_instance;
    public enjoyhint_script_steps = [
        {
            'next .storeName': 'Enter store name'
        },
        {'next .storeUrl': 'Enter store url'},
        {'next .storeApiKey': 'Enter Api Key'},
        {'click .submitBtnWrap': 'Click the "Add Store" button for adding store'},
        {
            onBeforeStart: function () {

            },
            selector: '.editIcon',
            event: 'addStore',
            event_type: 'custom',
            description: 'Click the "Add Store" button for adding store'
        }
    ];

    public tour = new Tour({
        container: "body",
        smartPlacement: true,
        keyboard: false,
        autoscroll: true,
        debug: true,
        backdrop: true,
        backdropContainer: 'body',
        backdropPadding: 20,
        redirect: false,
        orphan: false,
        duration: false,
        delay: false,
        basePath: "",
        storage: false,
        afterGetState: function (key, value) {},
        afterSetState: function (key, value) {},
        afterRemoveState: function (key, value) {},
        onStart: function (tour) {},
        onEnd: function (tour) {},
        onShow: function (tour) {},
        onShown: function (tour) {},
        onHide: function (tour) {},
        onHidden: function (tour) {},
        onNext: function (tour) {},
        onPrev: function (tour) {},
        onPause: function (tour, duration) {},
        onResume: function (tour, duration) {},
        onRedirectError: function (tour) {},
          template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-default' data-role='prev'>« Prev</button><span data-role='separator'>|</span><button class='btn btn-default' data-role='next'>Next »</button></div><button class='btn btn-default' data-role='end'>End tour</button></div>",
        steps: [
            {
                element: "app-add-store .storeName",
                title: "Step 1",
                content: "Content of my step"
            },
            {
                element: " app-add-store .storeApiKey",
                title: "Step 2",
                content: "Content of my step"
            },
     
            {
                element: ".submitBtnWrap app-button",
                title: "Step 3",
                content: "Content of my step",
                reflex: true,
                onNext: function() {
                    
                }
            
            },
            {
                element: ".storesWrap",
                title: "Step 4",
                content: "Content of my step",
             
            }
        ]
    });

    constructor(private storesService: StoresService, public element: ElementRef) {
        this.storesService.storesList.subscribe(data => {
            this.storeList = data;
        });
        if (!this.storeList) {
            this.storesService.getStores().subscribe((data) => {
                this.storeList = data['data']['view'];
            });
        }
    }

    ngOnInit() {
                 this.tour.init();
   
        //initialize instance
    }

    startHints() {
           this.tour.start();

    }

    createNewStore(data: object) {
        let scope = this;
        this.storesService.createStore(data).subscribe((resp) => {
            scope.storeList.unshift(resp['data']['view']);
            this.showServerError = false;
            this.clearForm = !this.clearForm;
            this.storesService.storesListLength.next(this.storeList['length']);
            this.showSuccess = true;
            this.enjoyhint_instance.trigger('custom');
            setTimeout(() => {
                scope.showSuccess = false;
            }, 2000);
        },
            (errors) => {
                this.showServerError = errors['errors']['main'];
            });
    }

    deleteStore(index: number) {
        this.storeList.splice(index, 1);
        this.storesService.storesListLength.next(this.storeList['length']);
    }
}

import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET} from "@angular/router";
import "rxjs/add/operator/filter";
import {BreadCrumb} from "../../../models/breadCrumb";

@Component({
    selector: "breadcrumb",
    templateUrl: "./breadcrumbs.component.html",
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbComponent implements OnInit {

    public breadcrumbs: BreadCrumb[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.breadcrumbs = [];
    }

    ngOnInit() {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
        let root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);

        //subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            let root: ActivatedRoute = this.activatedRoute.root;
            this.breadcrumbs = this.getBreadcrumbs(root);
            this.breadcrumbs.map((breadcrumb, index) => {
                if (!breadcrumb.label) {
                    this.breadcrumbs.splice(index, 1);
                }
            });

        });

        this.breadcrumbs.map((breadcrumb, index) => {
            if (!breadcrumb.label) {
                this.breadcrumbs.splice(index, 1);
            }
        });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

        //get the child routes
        let children: ActivatedRoute[] = route.children;

        //return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        //iterate over each children
        for (let child of children) {
            //verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            //get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            //append route URL to URL
            url += `/${routeURL}`;

            //add breadcrumb
            let breadcrumb: BreadCrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                url: url
            };
            breadcrumbs.push(breadcrumb);

            //recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
    }
}
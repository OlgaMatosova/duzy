import {Routes, RouterModule} from '@angular/router';
import {PromosComponent} from './promos/promos.component';
import {StoresComponent} from './stores/stores.component';
import {NewPromoComponent} from './promos/new-promo/new-promo.component';
import {PromosListComponent} from './promos/promos-list/promos-list.component';
import {EditPromoComponent} from './promos/edit-promo/edit-promo.component';
import {PromoResolve} from './promos/edit-promo/promo.resolve';
import {ProfileResolve} from './profile/profile.resolve';
import {StoresResolve} from './stores/stores.resolve';
import {ProfileComponent} from './profile/profile.component';
import {AnaliticsComponent} from './analitics/analitics.component';
import {Page404Component} from './page404/page404.component';

const dashboardRoutes: Routes = [
    {
        path: 'promos',
        component: PromosComponent,
        data: {
            breadcrumb: 'promos'
        },
        
        children: [
            {
                path: '',
                component: PromosListComponent,
                data: {
                    breadcrumb: ''
                },
            },
            {
                path: 'new',
                component: NewPromoComponent,
                data: {
                    breadcrumb: 'add new'
                },
            },
            {
                path: 'edit/:id',
                component: EditPromoComponent,
                resolve: {
                    promo: PromoResolve
                },
                data: {
                    breadcrumb: 'EDITOR MODE'
                },
            },
        ]
    },
    {
        path: 'stores',
        component: StoresComponent,
        resolve: {
            stores: StoresResolve
        },
        data: {
            breadcrumb: 'stores'
        },
    },
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
            profile: ProfileResolve
        },
        data: {
            breadcrumb: 'profile'
        },
    },
    {
        path: 'analitics',
        component: AnaliticsComponent,

        data: {
            breadcrumb: 'ANALYTICS'
        },
    },
    {
        path: 'page-404',
        component: Page404Component,
        data: {
            breadcrumb: ''
        },
    }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
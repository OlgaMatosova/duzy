import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebarComponent} from './sidebar/sidebar.component';
import {DashboardComponent} from './dashboard.component';
import {PromosComponent} from './promos/promos.component';
import {ToolbarComponent} from './sidebar/toolbar/toolbar.component';
import {AuthService} from '../auth/services/auth.service';
import {dashboardRouting} from './dashboard.routing';
import {SharedComponentModule} from '../shared/sharedComponent.module';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {NewPromoComponent} from './promos/new-promo/new-promo.component';
import {EditPromoComponent} from './promos/edit-promo/edit-promo.component';
import {MatTabsModule} from '@angular/material/tabs';
import {VideoService} from './promos/videos/videos.service';
import {PromoResolve} from './promos/edit-promo/promo.resolve';
import {ProfileResolve} from './profile/profile.resolve';
import {StoresResolve} from './stores/stores.resolve';
import {SortByPipe} from '../../pipes/sortBy.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import {Ng4FilesModule} from './ng4-files';
import {SinglePromoComponent} from './promos/single-promo/single-promo.component';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {PromosListComponent} from './promos/promos-list/promos-list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {StoresModule} from './stores/stores.module';
import { AnaliticsModule } from './analitics/analitics.module';
import { Page404Component } from './page404/page404.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        dashboardRouting,
        SharedComponentModule,
        RouterModule,
        MatTabsModule,
        MatExpansionModule,
        MalihuScrollbarModule.forChild(),
        Ng4FilesModule,
        MatButtonModule,       
        HttpClientModule,
        MatPaginatorModule,
        /*promos list*/
        MatGridListModule,
        InfiniteScrollModule,
        MatSidenavModule,
        StoresModule,
        AnaliticsModule
    ],
    declarations: [
        DashboardComponent,
        SidebarComponent,
        PromosComponent,
        ToolbarComponent,
        ProductsComponent,
        NewPromoComponent,
        EditPromoComponent,
        SortByPipe,
        SinglePromoComponent,
        PromosListComponent,
        ProfileComponent,
        Page404Component
    ],  
    providers: [AuthService, PromoResolve, ProfileResolve,StoresResolve, VideoService,],
    exports: [SortByPipe, RouterModule]
})
export class DashboardModule {}
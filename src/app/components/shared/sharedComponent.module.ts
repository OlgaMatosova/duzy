import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthService} from '../../components/auth/services/auth.service';
import {HttpModule} from '@angular/http';
import {ShowErrorsComponent} from '../errors/show-errors.component';
import {BulletComponent} from '../common/bullet/bullet.svg.component';
import {EqualValidator} from '../errors/equal-validator.directive';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {AddPromoComponent} from '../common/add-promo/add-promo.component';
import {ProgressComponent} from '../common/progress/progress.component';
import {BreadcrumbComponent} from '../common/breadcrambs/breadcrambs.component';
import {DragiconComponent} from '../common/dragicon/dragicon.component';
import {PromoCodeComponent} from '../common/promo-code/promo-code.component';
import {PromoProductsComponent} from '../common/promo-products/promo-products.component';
import {ProductItemComponent} from '../dashboard/products/product-item/product-item.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ShowPipe} from '../../pipes/showPage.pipe';
import {CopySvgComponent} from '../common/copy-svg/copy-svg.component';
import {RemoveSvgComponent} from '../common/remove-svg/remove-svg.component';
import { PreviewsComponent } from '../common/previews/previews.component';
import { ButtonComponent } from '../common/button-component/button-component.component';
import {DialogOverview} from '../common/dialogOverview/dialogOverview.component';
import {MatDialogModule} from '@angular/material/dialog';
import { WidgetComponent } from '../common/widget/widget.component';
import { SuccessIconComponent } from '../common/success-icon/success-icon.component';


@NgModule({
    declarations: [
        ShowErrorsComponent,
        EqualValidator,
        BulletComponent,
        AddPromoComponent,
        ProgressComponent,
        BreadcrumbComponent,
        DragiconComponent,
        PromoCodeComponent,
        PromoProductsComponent,
        ProductItemComponent,
        ShowPipe,
        CopySvgComponent,
        RemoveSvgComponent,
        PreviewsComponent,
        ButtonComponent,
        DialogOverview,
        WidgetComponent,
        SuccessIconComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatPaginatorModule,
    ],
    providers: [AuthService],
    exports: [
        ShowErrorsComponent,
        EqualValidator,
        BulletComponent,
        AddPromoComponent,
        ProgressComponent,
        BreadcrumbComponent,
        DragiconComponent,
        PromoCodeComponent,
        PromoProductsComponent,
        ProductItemComponent,
        ShowPipe,
        CopySvgComponent,
        RemoveSvgComponent,
        PreviewsComponent,
        ButtonComponent,
        DialogOverview,
        WidgetComponent,
        SuccessIconComponent
    ],
      entryComponents: [
        DialogOverview,
        
    ],
})
export class SharedComponentModule {}
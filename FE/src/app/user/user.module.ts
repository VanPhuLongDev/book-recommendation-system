import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {HomepageComponent} from './homepage/homepage.component';
import {ViewDetailComponent} from './view-detail/view-detail.component';
import {ViewInfoUserComponent} from './view-info-user/view-info-user.component';
import {ViewCartComponent} from './view-cart/view-cart.component';
import {ViewSearchComponent} from './view-search/view-search.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShareModuleModule} from '../share-module/share-module.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxPayPalModule} from 'ngx-paypal';
import { PaymentComponent } from './payment/payment.component';
import { ViewHistoryTransactionComponent } from './view-history-transaction/view-history-transaction.component';
import { ViewHistoryTransactionDetailComponent } from './view-history-transaction-detail/view-history-transaction-detail.component';
import { SliderBookComponent } from './layers/slider-book/slider-book.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';


@NgModule({
  declarations: [
    HomepageComponent,
    ViewDetailComponent,
    ViewInfoUserComponent,
    ViewCartComponent,
    ViewSearchComponent,
    ChangePasswordComponent,
    SidebarComponent,
    PaymentComponent,
    ViewHistoryTransactionComponent,
    ViewHistoryTransactionDetailComponent,
    SliderBookComponent,
    RatingStarsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ShareModuleModule,
    NgxSpinnerModule,
    NgxPayPalModule,
    FormsModule
  ]
})
export class UserModule {
}

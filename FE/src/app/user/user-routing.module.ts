import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ViewDetailComponent} from './view-detail/view-detail.component';
import {ViewInfoUserComponent} from './view-info-user/view-info-user.component';
import {ViewCartComponent} from './view-cart/view-cart.component';
import {ViewSearchComponent} from './view-search/view-search.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ViewHistoryTransactionComponent} from './view-history-transaction/view-history-transaction.component';
import {ViewHistoryTransactionDetailComponent} from './view-history-transaction-detail/view-history-transaction-detail.component';


const routes: Routes = [
  {
    path: '', component: HomepageComponent
  },
  {
    path: 'detail/:id', component: ViewDetailComponent
  },
  {
    path: 'info/me', component: ViewInfoUserComponent
  },
  {
    path: 'info/me/changePassword', component: ChangePasswordComponent
  },
  {
    path: 'cart', component: ViewCartComponent
  },
  {
    path: 'search', component: ViewSearchComponent
  },
  {
    path: 'info/me/history-transaction', component: ViewHistoryTransactionComponent
  },
  {
    path: 'info/me/history-transaction/:id', component: ViewHistoryTransactionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

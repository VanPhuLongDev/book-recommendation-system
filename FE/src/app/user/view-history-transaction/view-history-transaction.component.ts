import { Component, OnInit } from '@angular/core';
import {OrderDetail} from '../../models/order-detail';
import {OrderService} from '../service/order.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-view-history-transaction',
  templateUrl: './view-history-transaction.component.html',
  styleUrls: ['./view-history-transaction.component.css']
})
export class ViewHistoryTransactionComponent implements OnInit {
  orderDetails: OrderDetail[];
  bookNames: string[] = [];
  avatars = [];
  constructor(private orderService: OrderService, private storageService: TokenStorageService) { }

  ngOnInit(): void {
    this.orderService.findByUserId(this.storageService.getUser().id).subscribe(
      orderDetails => {
        this.orderDetails = orderDetails;
        this.orderDetails.forEach(orderDetail => {
          let bookName = '';
          orderDetail.orderItems.forEach(orderItem => {
            bookName += orderItem.book.name + ', ';
          });
          this.avatars.push(orderDetail.orderItems[0].book.avatar);
          this.bookNames.push(bookName.slice(0, bookName.length - 2));
        });
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import {OrderDetail} from '../../models/order-detail';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {OrderService} from '../service/order.service';

@Component({
  selector: 'app-view-history-transaction-detail',
  templateUrl: './view-history-transaction-detail.component.html',
  styleUrls: ['./view-history-transaction-detail.component.css']
})
export class ViewHistoryTransactionDetailComponent implements OnInit {
  orderDetail: OrderDetail;
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.orderService.findById(id).subscribe(
        orderDetail => this.orderDetail = orderDetail
      );
    });
  }

}

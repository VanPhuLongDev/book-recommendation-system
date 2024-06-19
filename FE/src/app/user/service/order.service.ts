import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseMessage } from "../../models/response-message";
import { OrderItem } from "../../models/order-item";
import { HttpClient } from "@angular/common/http";
import { OrderDetail } from "../../models/order-detail";
import { environment } from "../../../environments/environment";

const API_URL = `${environment.apiurl}/order`;

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private http: HttpClient) {}

  order(
    userId: number,
    totalPrice: number,
    orderItems: OrderItem[]
  ): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(
      API_URL + "?userId=" + userId + "&&totalPrice=" + totalPrice,
      orderItems
    );
  }

  findById(orderDetailId: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(
      API_URL + "/findById?id=" + orderDetailId
    );
  }

  findByUserId(userId: number): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(
      API_URL + "/findByUserId?userId=" + userId
    );
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartItem } from "../../models/cart-item";
import { render } from "creditcardpayments/creditCardPayments";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  @Input() cartItems: CartItem[];
  @Input() price = 1;
  @Output() newItemEvent = new EventEmitter<boolean>();
  priceUSD: string;
  constructor() {}

  ngOnInit(): void {
    this.priceUSD = (this.price / 23000).toFixed(2);
    render({
      id: "#paypalBtn",
      currency: "USD",
      value: this.priceUSD,
      onApprove: (details) => {
        this.newItemEvent.emit();
      },
    });
  }
}

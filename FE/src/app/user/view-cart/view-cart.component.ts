import { Component, ElementRef, OnInit } from "@angular/core";
import { CartService } from "../service/cart.service";
import { CartItem } from "../../models/cart-item";
import { TokenStorageService } from "../../services/token-storage.service";
import { Book } from "../../models/book";
import { ToastrService } from "ngx-toastr";
import { CartStorageService } from "../../services/cart-storage.service";
import { NgxSpinnerService } from "ngx-spinner";
import { OrderItem } from "../../models/order-item";
import { OrderService } from "../service/order.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.css"],
})
export class ViewCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  idCartItemDelete = 0;
  book: Book;
  totalPrice = 0;
  quantityCheck = 0;
  cartItemsChecked: CartItem[] = [];
  isOpenModalPayment = false;

  constructor(
    private cartService: CartService,
    private storageService: TokenStorageService,
    private spinner: NgxSpinnerService,
    private el: ElementRef,
    private toastrService: ToastrService,
    private cartStorageService: CartStorageService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.checkIsLogin()) {
      this.getCartByUserId();
    } else {
      this.cartItems = this.cartStorageService.getItems();
    }
  }

  getCartByUserId() {
    this.cartService
      .getCartItemByUserId(this.storageService.getUser().id)
      .subscribe((items) => {
        this.cartItems = items;
        this.cartService.cartItems$.next(items);
      });
  }

  openModalDelete(id: number) {
    this.idCartItemDelete = id;
    this.book = this.cartItems.find((c) => c.id === id).book;
    const modal = this.el.nativeElement.querySelector(".modal.modal-delete");
    modal.style.display = "block";
  }

  hiddenModalDelete() {
    const modal = this.el.nativeElement.querySelector(".modal.modal-delete");
    modal.style.display = "none";
  }

  subQuantity(id: number, bookId: number) {
    const inputQuantity = this.el.nativeElement.querySelector(
      "#inputQuantity" + id
    );
    const checkedItem = this.el.nativeElement.querySelector(
      "#checkedItem" + id
    );
    if (this.storageService.checkIsLogin()) {
      if (inputQuantity.value > 1) {
        this.cartService
          .updateCartItem(Number(inputQuantity.value) - 1, id, bookId)
          .subscribe(
            (next) => {
              const cartItem = this.cartItems.find((t) => t.id === id);
              cartItem.amount--;
              inputQuantity.value--;
              this.cartService.reloadCartItems();
              if (checkedItem.checked) {
                this.totalPrice -= cartItem.book.price;
              }
            },
            (error) => {
              this.toastrService.warning(error.error.message, "Thông báo");
            }
          );
      } else {
        this.openModalDelete(id);
      }
    } else {
      const cartItem = this.cartItems.find((t) => t.id === id);
      if (cartItem.amount === 1) {
        this.openModalDelete(id);
      } else {
        inputQuantity.value--;
        cartItem.amount--;
        this.cartStorageService.updateCart(cartItem);
        if (checkedItem.checked) {
          this.totalPrice -= cartItem.book.price;
        }
      }
    }
  }

  addQuantity(id: number, bookId: number) {
    const selector = "#inputQuantity" + id;
    const checkedItem = this.el.nativeElement.querySelector(
      "#checkedItem" + id
    );
    const inputQuantity = this.el.nativeElement.querySelector(selector);

    if (this.storageService.checkIsLogin()) {
      this.cartService
        .updateCartItem(Number(inputQuantity.value) + 1, id, bookId)
        .subscribe(
          (next) => {
            inputQuantity.value++;
            const cartItem = this.cartItems.find((t) => t.id === id);
            cartItem.amount++;
            this.cartService.reloadCartItems();
            if (checkedItem.checked) {
              this.totalPrice += cartItem.book.price;
            }
          },
          (error) => {
            this.toastrService.warning(error.error.message, "Thông báo");
          }
        );
    } else {
      inputQuantity.value++;
      const cartItem = this.cartItems.find((t) => t.id === id);
      cartItem.amount++;
      if (checkedItem.checked) {
        this.totalPrice += cartItem.book.price;
      }
      this.cartStorageService.updateCart(cartItem);
    }
  }

  checkedItem(cartItem: CartItem, checkbox) {
    if (checkbox.checked) {
      this.quantityCheck++;
      this.totalPrice += cartItem.amount * cartItem.book.price;
      this.cartItemsChecked.push(cartItem);
    } else {
      this.totalPrice -= cartItem.amount * cartItem.book.price;
      this.quantityCheck--;
      this.cartItemsChecked.splice(
        this.cartItemsChecked.findIndex((c) => c.id === cartItem.id),
        1
      );
    }
    let isCheckedAll = true;
    const checkItems = this.el.nativeElement.querySelectorAll(".checked-item");
    checkItems.forEach((c) => {
      if (c.checked === false) {
        isCheckedAll = false;
        return;
      }
    });
    this.el.nativeElement.querySelector(".check-add-all-products").checked =
      isCheckedAll;
  }

  checkAllProducts(event: any) {
    const checkItems = this.el.nativeElement.querySelectorAll(".checked-item");

    if (event.target.checked) {
      this.quantityCheck = this.cartItems.length;
      checkItems.forEach((t: any) => {
        t.checked = true;
        this.calculateTotalPrice();
      });
      this.cartItemsChecked = this.cartItems;
    } else {
      this.cartItemsChecked = [];
      checkItems.forEach((t: any) => (t.checked = false));
      this.quantityCheck = 0;
      this.totalPrice = 0;
    }
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.forEach((c) => (this.totalPrice += c.amount * c.book.price));
  }

  removeItem() {
    this.hiddenModalDelete();
    const index = this.cartItems.findIndex(
      (c) => c.id === this.idCartItemDelete
    );
    const indexCartChecked = this.cartItemsChecked.findIndex(
      (c) => c.id === this.idCartItemDelete
    );
    if (this.storageService.checkIsLogin()) {
      this.cartService
        .deleteCartItem(this.idCartItemDelete)
        .subscribe((next) => {
          this.totalPrice -= this.cartItems[index].book.price;
          this.cartItems.splice(index, 1);
          this.cartItemsChecked.splice(indexCartChecked, 1);
          this.cartService.reloadCartItems();
          this.toastrService.success(
            "Xoá sản phẩm khỏi giỏ hàng thành công !!!",
            "Thông báo"
          );
        });
    } else {
      this.totalPrice -= this.cartItems[index].book.price;
      this.cartStorageService.removeItem(this.cartItems[index]);
      this.cartItems.splice(index, 1);
      this.cartItemsChecked.splice(indexCartChecked, 1);
    }
  }

  openModalPayment() {
    this.isOpenModalPayment = true;
    if (this.totalPrice > 0) {
      const modal = this.el.nativeElement.querySelector(".modal.modal-payment");
      modal.style.display = "block";
    }
  }

  hiddenModalPayment() {
    this.isOpenModalPayment = false;
    const modal = this.el.nativeElement.querySelector(".modal.modal-payment");
    modal.style.display = "none";
  }

  paymentSuccess() {
    const orderItems: OrderItem[] = [];
    const cartItemIds = [];
    this.cartItemsChecked.forEach((c) => {
      orderItems.push({
        price: c.book.price,
        amount: c.amount,
        book: c.book,
      });
      cartItemIds.push(c.id);
    });
    // delete cart item
    this.cartService.deleteCartItems(cartItemIds).subscribe((next) => {
      this.getCartByUserId();
    });
    // gọi hàm order: trong hàm order thì save OrderDetail + OrderItem + Update amount book
    this.orderService
      .order(this.storageService.getUser().id, this.totalPrice, orderItems)
      .subscribe((next) => {
        this.router.navigateByUrl("/info/me/history-transaction/" + next.id);
      });
    // this.reset();
  }

  // reset() {
  //   const modal = this.el.nativeElement.querySelector('.modal.modal-payment');
  //   modal.style.display = 'none';
  //   this.toastrService.success('Bạn đã đặt hàng và thanh toán thành công !!!', 'Cảm ơn quý khách !!!');
  //   this.totalPrice = 0;
  //   this.quantityCheck = 0;
  //   this.el.nativeElement.querySelector('.check-add-all-products').checked = false;
  //   this.cartItemsChecked = [];
  //   this.isOpenModalPayment = false;
  // }
}

import { Component, ElementRef, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from "@angular/router";
import { Book } from "../../models/book";
import { BookService } from "../service/book.service";
import { CartService } from "../service/cart.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { ToastrService } from "ngx-toastr";
import { CartItem } from "../../models/cart-item";
import { CartStorageService } from "../../services/cart-storage.service";
import { UserBookRatingService } from "../service/user_book_rating.service";
import { User } from "src/app/models/user";
import { WEIGHT_RATING } from "src/app/contants/variable";
import { BookCareStorageService } from "src/app/services/book-care-storage.service";

@Component({
  selector: "app-view-detail",
  templateUrl: "./view-detail.component.html",
  styleUrls: ["./view-detail.component.css"],
})
export class ViewDetailComponent implements OnInit {
  id: number;
  book: Book;
  descriptions: string[];
  isViewDesc = false;
  booksCategory: Book[];
  booksAuthor: Book[];
  booksRelative: Book[];
  comments: any[] = [];
  indexbooksCategory = 0;
  user: User;

  titlebooksCategory = "Sách cùng thể loại";
  titlebooksAuthor = "Sách cùng tác giả";
  titlebooksRelative = "Sách liên quan";

  // indexbooksAuthor = 0;
  numberRatings: number[] = [1, 2, 3, 4, 5];
  number_rating = 0;
  comment = "";

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private el: ElementRef,
    private cartService: CartService,
    private storageService: TokenStorageService,
    private toastrService: ToastrService,
    private cartStorageService: CartStorageService,
    private userBookRatingService: UserBookRatingService,
    private bookCareStorageService: BookCareStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        }); // Di chuyển màn hình lên đầu trang
      }
    });

    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = Number(param.get("id"));

      this.getBooksRelative();

      this.bookService.findById(this.id).subscribe((b) => {
        this.book = b;
        this.descriptions = b.description.split("\n");
        this.book.moreInformation = JSON.parse(this.book.moreInformation);

        this.saveBookCare(WEIGHT_RATING.RATING_CARE);
        this.getBooksSameCategory(b.category.name);
        this.getBooksSameAuthor(b.author);
      });

      this.getComments();
    });
  }

  getComments() {
    this.userBookRatingService.getComment(this.id).subscribe((data) => {
      this.comments = data;
    });
  }

  saveBookCare(point: number) {
    if (this.storageService.checkIsLogin()) {
      this.user = this.storageService.getUser();
      this.userBookRatingService
        .updateRating(this.user.id, this.id, point)
        .subscribe(
          (next) => {
            console.log("RATING OK", point);
          },
          (error) => {
            console.log("RATING ERROR");
          }
        );
      this.bookCareStorageService.saveBooksCare(this.id);
    } else {
      this.bookCareStorageService.saveBooksCare(this.id);
    }
  }

  getBooksSameCategory(categoryName: any) {
    this.bookService
      .findBooksSameCategoryLimit(categoryName)
      .subscribe((bs) => {
        this.booksCategory = bs;
      });
  }

  getBooksSameAuthor(author: any) {
    this.bookService.findBooksSameAuthor(author).subscribe((bs) => {
      this.booksAuthor = bs;
    });
  }

  getBooksRelative() {
    this.bookService.findBooksRelative(this.id).subscribe((bs) => {
      this.booksRelative = bs;
    });
  }

  changeView() {
    this.isViewDesc = !this.isViewDesc;
  }

  addToCart() {
    const inputQuantity = this.el.nativeElement.querySelector(
      ".input-change-quantity"
    );
    const amount = inputQuantity.value;
    if (amount > 0) {
      if (this.storageService.checkIsLogin()) {
        this.cartService
          .addToCart(
            amount,
            this.storageService.getUser().cart.id,
            this.book?.id
          )
          .subscribe((next) => {
            this.toastrService.success("Thêm vào giỏ hàng thành công !!!");
            this.cartService.reloadCartItems();

            this.saveBookCare(WEIGHT_RATING.RATING_ADD_TO_CART);
          });
      } else {
        const cartItem: CartItem = {
          amount: Number(amount),
          book: this.book,
        };
        this.cartStorageService.addToCart(cartItem);
        this.toastrService.success("Thêm vào giỏ hàng thành công !!!");
        this.cartService.cartItems$.next(this.cartStorageService.cartItems);
        this.saveBookCare(WEIGHT_RATING.RATING_ADD_TO_CART);
      }
    }
  }

  subQuantity() {
    const inputQuantity = this.el.nativeElement.querySelector(
      ".input-change-quantity"
    );
    if (inputQuantity.value > 1) {
      inputQuantity.value--;
    }
  }

  addQuantity() {
    const inputQuantity = this.el.nativeElement.querySelector(
      ".input-change-quantity"
    );
    inputQuantity.value++;
  }

  openModalRating() {
    const modal = this.el.nativeElement.querySelector(".modal.modal-rating");
    modal.style.display = "block";
  }

  hiddenModalRating() {
    const modal = this.el.nativeElement.querySelector(".modal.modal-rating");
    modal.style.display = "none";
  }

  saveRating() {
    if (!this.number_rating) {
      return;
    }

    console.log(this.number_rating, this.comment);

    if (this.storageService.checkIsLogin()) {
      this.user = this.storageService.getUser();
      this.userBookRatingService
        .updateRating(
          this.user.id,
          this.id,
          this.number_rating,
          this.comment,
          true
        )
        .subscribe(
          (next) => {
            console.log("RATING OK", this.number_rating, this.comment);
            this.toastrService.success("Đánh giá thành công !!!");
            this.hiddenModalRating();

            this.getComments();
          },
          (error) => {
            console.log("RATING ERROR");
            this.toastrService.error("Đánh giá thất bại !!!");
            this.hiddenModalRating();
          }
        );
      this.bookCareStorageService.saveBooksCare(this.id);
    }
  }

  changeRating($event: any) {
    this.number_rating = $event;
  }
}

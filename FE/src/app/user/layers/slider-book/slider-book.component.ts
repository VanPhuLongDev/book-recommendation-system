import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "src/app/models/book";

@Component({
  selector: "app-slider-book",
  templateUrl: "./slider-book.component.html",
  styleUrls: ["./slider-book.component.css"],
})
export class SliderBookComponent implements OnInit {
  @Input() books: Book[];
  @Input() title: string;

  indexbooksCategory = 0;
  numberRatings: number[] = [1, 2, 3, 4, 5];

  constructor(private el: ElementRef, private router: Router) {}

  ngOnInit(): void {}

  viewAnotherBook(id: number) {
    this.router.navigateByUrl("/detail/" + id);
  }

  previous() {
    if (this.indexbooksCategory > 0) {
      this.indexbooksCategory--;
      const products = this.el.nativeElement.querySelectorAll(
        ".row-display .product-item-wrapper"
      );
      const width = products[0].offsetWidth + 20;

      for (const p of products) {
        const result = Number(p.style.left.replace("px", "")) + width;
        p.style.left = result + "px";
      }
    }
  }

  next() {
    if (this.indexbooksCategory < this.books.length - 6) {
      this.indexbooksCategory++;
      const products = this.el.nativeElement.querySelectorAll(
        ".row-display .product-item-wrapper"
      );
      const width = products[0].offsetWidth + 20;

      for (const p of products) {
        const result = Number(p.style.left.replace("px", "")) - width;
        p.style.left = result + "px";
      }
    }
  }
}

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { TokenStorageService } from "../../services/token-storage.service";
import { User } from "../../models/user";
import { BookService } from "../service/book.service";
import { Category } from "../../models/category";
import { Book } from "../../models/book";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { BookCareStorageService } from "src/app/services/book-care-storage.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit, AfterViewInit {
  @ViewChildren("slides", { read: ElementRef })
  public slidesElement!: QueryList<ElementRef<HTMLLIElement>>;
  user: User;
  categories: Category[] = [];
  books: Book[] = [];
  imageUrl: string;
  page: number = 0;
  pageSize: number = 36;
  totalPages: number;
  numberRatings: number[] = [1, 2, 3, 4, 5];
  isLoading: boolean = false;
  isRecommend: boolean = false;

  indexSlide = 0;
  images = [
    {
      path: "https://cdn0.fahasa.com/media/magentothem/banner7/STKT9_Banner_840x320.jpg",
    },
    {
      path: "https://cdn0.fahasa.com/media/magentothem/banner7/momo_840x320.jpg",
    },
    {
      path: "https://cdn0.fahasa.com/media/magentothem/banner7/FahasaOnline-T8_840x320.jpg",
    },
    {
      path: "https://cdn0.fahasa.com/media/magentothem/banner7/MOCA-T09.2022_840x320.jpg",
    },
    {
      path: "https://cdn0.fahasa.com/media/magentothem/banner7/VNPAY-T09.2022_840x320_09.09---10.09-GIAM-25K.jpg",
    },
    {
      path: "https://cdn0.fahasa.com/media/magentothem/banner7/bktrithuct9_840x320.jpg",
    },
    { path: "https://cdn0.fahasa.com/media/magentothem/banner7/840_x_320.png" },
  ];

  bookIdsCare: any[] = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private bookService: BookService,
    private toastrService: ToastrService,
    private router: Router,
    private el: ElementRef,
    private bookCareService: BookCareStorageService
  ) {}

  ngOnInit(): void {
    this.user = {
      name: "",
    };
    if (this.tokenStorageService.checkIsLogin()) {
      this.user = this.tokenStorageService.getUser();
    }
    this.getCategories();
    this.bookIdsCare = this.bookCareService.loadBooksCare();
    if (this.bookIdsCare.length > 0) {
      this.isRecommend = true;
      this.bookService.findBooksRecommend().subscribe((books) => {
        this.books = books;
        console.log(books);
        console.log(this.books);
      });
    } else {
      this.getBooks();
    }
  }

  ngAfterViewInit(): void {
    this.sliderAdvertisement();
  }

  getCategories() {
    this.bookService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getBooksRecommend() {
    this.isRecommend = true;
    this.isLoading = true;
    this.bookService.findBooksRecommend(this.page, this.pageSize).subscribe(
      (books) => {
        this.books = this.books.concat(books);
        this.isLoading = false;

        if (books.length < this.pageSize) {
          this.getBooks();
        }
      },
      (error) => {
        this.toastrService.error("Lỗi tìm kiếm sản phẩm");
        this.isLoading = false;
      }
    );
  }

  getBooks() {
    this.isRecommend = false;
    this.isLoading = true;
    this.bookService.paginate(this.page, this.pageSize).subscribe(
      (page) => {
        this.books = this.books.concat(page.content);
        this.totalPages = page.totalPages;
        this.isLoading = false;
      },
      (error) => {
        this.toastrService.error("Lỗi tìm kiếm sản phẩm");
        this.isLoading = false;
      }
    );
  }

  viewMore() {
    if (this.isRecommend) {
      this.page = this.page + 1;
      this.getBooksRecommend();
      return;
    }

    if (this.page < this.totalPages - 1) {
      this.page = this.page + 1;
      this.getBooks();
    }
  }

  sliderAdvertisement() {
    const slides = this.slidesElement.toArray().map((x) => x.nativeElement);
    const sizeSlides = slides.length;

    slides.forEach((e) => {
      e.style.display = "none";
      e.style.opacity = "0";
    });
    slides[0].style.display = "block";
    slides[0].style.opacity = "1";

    window.setInterval(() => {
      if (this.indexSlide === sizeSlides) {
        this.indexSlide = 0;
      }
      if (this.indexSlide === -1) {
        this.indexSlide = sizeSlides - 1;
      }
      for (let i = 0; i < sizeSlides; i++) {
        slides[i].style.display = "none";
        slides[i].style.opacity = "0";
      }
      slides[this.indexSlide].style.display = "block";
      slides[this.indexSlide].style.opacity = "1";
      this.indexSlide++;
    }, 3000);
  }

  search(q: string) {
    this.router.navigateByUrl("/search?q=" + q + "&page=1");
  }
}

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BookCareStorageService {
  bookIds: any[] = [];
  constructor() {}

  saveBooksCare(id: number): void {
    if (!this.bookIds.includes(id)) {
      // Kiểm tra xem id đã tồn tại trong mảng chưa
      this.bookIds.push(id);
      localStorage.setItem("books_care", JSON.stringify(this.bookIds));
    }
  }

  loadBooksCare(): any[] {
    if (this.bookIds.length === 0) {
      this.bookIds = JSON.parse(localStorage.getItem("books_care")) ?? [];
    }
    return this.bookIds;
  }
}

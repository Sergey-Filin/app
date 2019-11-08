import { Injectable, SimpleChanges } from "@angular/core";
import { Pager, array } from "../interfaces";
import { PaginationPage } from "../paginationPage";

@Injectable({ providedIn: "root" })
export class PaginateService {
  // PaginatedDataSource
  paginationPage: PaginationPage;
  pager: any = {};

  constructor() {
    this.paginationPage = new PaginationPage();
  }

  checkArray(value: number) {
    if (array && array.length) {
      this.setPage(value);
    }
  }

  checkChanges(changes: SimpleChanges, initialPage: number) {
    if (changes.pager.currentValue == changes.pager.previousValue) {
      this.setPage(initialPage);
    }
  }

  setPage(page: number, pageSize = 10, maxPages = 10) {
    this.pager = this.paginationPage.paginate( array.length, page, pageSize, maxPages);
    return array.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}

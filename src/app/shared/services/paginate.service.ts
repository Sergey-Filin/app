import { Injectable, SimpleChanges } from "@angular/core";
import { pager } from "../paginationPage";

@Injectable({ providedIn: "root" })
export class PaginateService {
  pager: any = {};

  constructor() {
  }

  checkArray(value: number, array) {
    if (array && array.length) {
      this.setPage(array, value);
    }
  }

  checkChanges(changes: SimpleChanges, initialPage: number, array) {
    if (changes.pager.currentValue == changes.pager.previousValue) {
      this.setPage(array, initialPage);
    }
  }

  setPage(array, page: number, pageSize = 10, maxPages = 10) {
    this.pager = pager(array.length, page, pageSize, maxPages);
    return array.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}

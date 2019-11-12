import { Injectable, SimpleChanges } from "@angular/core";
import { pager } from "../paginationPage";

@Injectable({ providedIn: "root" })
export class PaginateService {

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
    const pagerr = pager(array.length, page, pageSize, maxPages);
    return array.slice(pagerr.startIndex, pagerr.endIndex + 1);
  }
}

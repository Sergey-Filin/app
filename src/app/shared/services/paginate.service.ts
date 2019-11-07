import { SimpleChanges, Injectable } from "@angular/core";
import { Pager } from "../interfaces";

@Injectable({ providedIn: "root" })
export class PaginateService {
  // PaginatedDataSource

  pager: any = {};


  constructor() {
	}


  setPage(page: number, pageSize = 10, maxPages = 10) {
    this.pager = this.paginate(this.array.length, page, pageSize, maxPages);
    return this.array.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  paginate(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
  ) {
    let totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      i => startPage + i
    );

    return new Pager(
      (totalItems = totalItems),
      (currentPage = currentPage),
      (pageSize = pageSize),
      (totalPages = totalPages),
      (startPage = startPage),
      (endPage = endPage),
      (startIndex = startIndex),
      (endIndex = endIndex),
      (pages = pages)
    );
  }
}

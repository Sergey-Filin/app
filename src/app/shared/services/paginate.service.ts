import { SimpleChanges } from "@angular/core";

export class PaginateService {
  // PaginatedDataSource

  array: Array<any> = [];
  pager: any = {};

  constructor(public key: String) {}

  checkArray(value: number) {
		if (this.array && this.array.length) {
			this.setPage(value);
		}
  }

  checkChanges(changes: SimpleChanges, initialPage: number) {
	    if (changes.pager.currentValue !== changes.pager.previousValue) {
      this.setPage(initialPage);
    }
  }

  setPage(page: number, pageSize = 10, maxPages = 10) {
    this.pager = this.paginate(this.array.length, page, pageSize, maxPages);
    let pageOfItems = this.array.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    return pageOfItems;
  }

  initValue() {
    let keys = Object.keys(localStorage); // СПЕЦ СИМВОЛЫ
    for (let key of keys) {
      let item = localStorage.getItem(key);
      let object = JSON.parse(item);
      let objectValue = { key: key, value: object };
      this.array.unshift(objectValue);
    }
    return this.itemsPage();
  }

  change(elem, key) {
    localStorage.removeItem(elem.key);
    elem.value.nameBook = prompt("Book title change", "");
    elem.value.authorBook = prompt("Changing the author of a book", "");
    let objectValue = {
      key: key + elem.value.nameBook + elem.value.authorBook,
      value: {
        nameBook: elem.value.nameBook,
        authorBook: elem.value.authorBook
      }
    };
    localStorage.setItem(objectValue.key, JSON.stringify(objectValue.value));
  }

  arrayRemovingElement(elem, index) {
    localStorage.removeItem(elem.key);
    this.array.splice(index, 1);
    return this.itemsPage();
  }

  unshift(element, key) {
    let objectValue = {
      key: key + element.key,
      value: { nameBook: element.name, authorBook: element.author }
    };
    this.array.unshift(objectValue);
    localStorage.setItem(objectValue.key, JSON.stringify(objectValue.value));
    return this.itemsPage();
  }

  itemsPage() {
    this.pager = this.paginate(this.array.length);
    return this.array.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  private paginate(
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

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}

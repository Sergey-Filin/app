import { Injectable } from "@angular/core";
import { Keyable } from '../models/book';

@Injectable({
  providedIn: "root"
})
export class PaginateService {
	// PaginatedDataSource
	
	array: Array<Keyable> = [];		
	pager: any = {};
	
	constructor(public key: String) { }

  checkArray(initialPage) {
    if (this.array && this.array.length) {
      this.setPage(initialPage);
    }
	}
	
  checkChanges(changes, initialPage) {
    if (changes.items.currentValue !== changes.items.previousValue) {
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
    let keys = Object.keys(localStorage); // Отфильтровать все значения которые начинаются с уникального ключа + спец символ
    for (let key of keys) {
			let item = localStorage.getItem(key);
			let object = JSON.parse(item);
      this.array.unshift(object);
		}
    return this.itemsPage();
  }

  change(elem) {
    localStorage.removeItem(elem.book);
    elem.book = prompt("Book title change", "");
    elem.authorBook = prompt("Changing the author of a book", "");
    localStorage.setItem(elem.book, elem.authorBook);
  }

  arrayRemovingElement(index) {
		console.log(index)
    localStorage.removeItem(index);
    this.array.splice(index, 1);
		return this.itemsPage();
  }

  unshift(element) {
    this.array.unshift(element);
    localStorage.setItem(element.name, JSON.stringify(element));
    return this.itemsPage();
	}
	
	itemsPage(){
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

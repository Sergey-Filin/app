import { Injectable, SimpleChanges } from "@angular/core";
@Injectable({ providedIn: "root" })
export class ChangeTableService {

  array: Array<any> = [];

	constructor() {
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

	checkArray(value: number) {
    if (this.array && this.array.length) {
      this.setPage(value);
    }
  }

	checkChanges(changes: SimpleChanges, initialPage: number) {
    if (changes.pager.currentValue == changes.pager.previousValue) {
      this.setPage(initialPage);
    }
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

  change(currentValueNameBook, currentValueAuthorBook, currentKey, key) {
    localStorage.removeItem(currentKey);

    let objectValue = {
      key: key + currentValueNameBook + currentValueAuthorBook,
      value: {
        nameBook: currentValueNameBook,
        authorBook: currentValueAuthorBook
      }
    };
    localStorage.setItem(objectValue.key, JSON.stringify(objectValue.value));
	}
	
  itemsPage() {
    let pager = this.paginate(this.array.length);
    return this.array.slice(pager.startIndex, pager.endIndex + 1);
	}
	
}

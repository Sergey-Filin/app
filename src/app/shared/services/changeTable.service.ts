import { Injectable } from "@angular/core";
import { TableValueFull, Pager } from '../interfaces';
import { pager } from "../paginationPage";

@Injectable({ providedIn: "root" })
export class ChangeTableService {    
	
	// datasource
	array: Array<TableValueFull> = [];
	pagerr:Pager;

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

    const objectValue = {
      key: key + currentValueNameBook + currentValueAuthorBook,
      value: {
        nameBook: currentValueNameBook,
        authorBook: currentValueAuthorBook
      }
    };
    localStorage.setItem(objectValue.key, JSON.stringify(objectValue.value));
	}
	
  itemsPage() {
		this.pagerr = pager(this.array.length);
    return this.array.slice(this.pagerr.startIndex, this.pagerr.endIndex + 1);
	}
}	

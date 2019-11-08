import { Injectable, SimpleChanges } from "@angular/core";
import { array } from "../interfaces";
@Injectable({ providedIn: "root" })
export class ChangeTableService {

	constructor() {
	}

  initValue() {
    let keys = Object.keys(localStorage); // СПЕЦ СИМВОЛЫ
    for (let key of keys) {
      let item = localStorage.getItem(key);
      let object = JSON.parse(item);
      let objectValue = { key: key, value: object };
      array.unshift(objectValue);
    }
    return this.itemsPage();
  }

	arrayRemovingElement(elem, index) {
    localStorage.removeItem(elem.key);
    array.splice(index, 1);
    return this.itemsPage();
	}
	
	unshift(element, key) {
    let objectValue = {
      key: key + element.key,
      value: { nameBook: element.name, authorBook: element.author }
    };
    array.unshift(objectValue);
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
    let pager = this.paginate(array.length);
    return array.slice(pager.startIndex, pager.endIndex + 1);
	}
	
}

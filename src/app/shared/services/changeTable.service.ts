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

  initValue(key: string) {
		let keys = Object.keys(localStorage); // СПЕЦ СИМВОЛЫ
		keys = keys.filter(str => str.slice(0,4) === key);
    for (let key of keys) {
      let item = localStorage.getItem(key);
      let object = JSON.parse(item);
      let objectValue = { key: key, value: object };
      this.array.unshift(objectValue);
    }
    return this.itemsPage();
	}
	
	filter(value){
		let filterArray = this.array.filter(book => 
			book.value.nameBook.toLocaleLowerCase().includes(value.toLocaleLowerCase()) 
			|| 
			book.value.authorBook.toLocaleLowerCase().includes(value.toLocaleLowerCase())
		);
		this.pagerr = pager(filterArray.length);
    return filterArray.slice(this.pagerr.startIndex, this.pagerr.endIndex + 1);
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

import { UserValueFull, Pager } from '../interfaces';
import { Injectable } from '@angular/core';
import { pager } from "../paginationPage";

 @Injectable({providedIn: "root"})
export class UserChangeTableService {
	
	array: Array<UserValueFull> = [];
	pagerr: Pager;

	constructor() {	}

	filter(value){
		let filterArray = this.array.filter(user =>{  	
			return user.value.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) 
			  || 
			  user.value.email.toLocaleLowerCase().includes(value.toLocaleLowerCase())
			  ||
				String(user.value.phone).includes(value)
		}
		);
		this.pagerr = pager(filterArray.length);
    return filterArray.slice(this.pagerr.startIndex, this.pagerr.endIndex + 1);
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
	
	unshift(element, key) {
    let objectValue = {
      key: key + element.key,
      value: { name: element.name, email: element.email, phone: element.phone }
    };
    this.array.unshift(objectValue);
    localStorage.setItem(objectValue.key, JSON.stringify(objectValue.value));
    return this.itemsPage();
	}

	arrayRemovingElement(elem, index) {
    localStorage.removeItem(elem.key);
    this.array.splice(index, 1);
    return this.itemsPage();
	}

	change(currentValueName, currentValueEmail, currentValuePhone, currentKey, key) {
    localStorage.removeItem(currentKey);

    const objectValue = {
      key: key + currentValueName + currentValueEmail + currentValuePhone,
      value: {
        name: currentValueName,
        email: currentValueEmail,
        phone: currentValuePhone,
      }
    };
    localStorage.setItem(objectValue.key, JSON.stringify(objectValue.value));
	}

	itemsPage() {
		this.pagerr = pager(this.array.length);
    return this.array.slice(this.pagerr.startIndex, this.pagerr.endIndex + 1);
	}
}
import { Component, OnInit, SimpleChanges } from "@angular/core";
import { PaginateService } from "../shared/services/paginate.service";
import { Book } from "../shared/models/book";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalService } from "../shared/services/modal.service";
import { createOfflineCompileUrlResolver } from '@angular/compiler';

const KEY = "BOOK";

@Component({
  selector: "app-table-book",
  templateUrl: "./table-book.component.html",
  styleUrls: ["./table-book.component.css"],
  providers: [{ provide: PaginateService, useValue: "key" }]
})
export class TableBookComponent implements OnInit {
	book: Book = new Book("", "");
  pageOfItems: Array<any>;
  tableBookForm: FormGroup;
  protected pagination;

  changeValueNameBook;
  changeValueAuthorBook;

	initialPage: number = 1;
	
	tableBookInput: string = "";

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.pagination = new PaginateService(this.book.key);
  }

  ngOnInit() {
    this.tableBookForm = this.fb.group({
      nameBook: ["", Validators.required],
      authorBook: ["", Validators.required]
    });
    this.pageOfItems = this.pagination.initValue();
  }

  get f() {
    return this.tableBookForm.controls;
  }

	onModalFormGroup(modalFormValue){
		console.log(modalFormValue) 
		console.log("SAVECHANGE") 
	}

	arrayElement(elem){
		this.tableBookInput = elem.value;		
		console.log(this.tableBookInput);
	}

	openModal(id: string) {			//  записать новое значение туда где изменяем || передать значение изменяемого елемента || привязка в реактивных формах 
		// this.tableBookInput = elem.value;
		// console.log(this.tableBookInput);
		
    this.modalService.open(id);
	}

  saveChange(key = KEY) {
		
    let currentKey = key + this.changeValueNameBook  + this.changeValueAuthorBook;
		let currentValueNameBook = this.tableBookForm.value.nameBook;
    let currentValueAuthorBook = this.tableBookForm.value.authorBook;
	
   	this.pagination.change(currentValueNameBook, currentValueAuthorBook, currentKey, key);
		console.log(this.pageOfItems)
	}

  onCheckArray(value: number) {
		this.pagination.checkArray(value);
  }

  onCheckChanges(changes: SimpleChanges) {
    this.pagination.checkChanges(changes, this.initialPage);
  }

  onChangePage(page: number) {
    this.pageOfItems = this.pagination.setPage(page);
  }

  remove(elem, index) {
    this.pageOfItems = this.pagination.arrayRemovingElement(elem, index);
  }

  submit() {
    let book = new Book(
      this.tableBookForm.value.nameBook,
      this.tableBookForm.value.authorBook
    );
    this.pageOfItems = this.pagination.unshift(book, KEY);
  }
}

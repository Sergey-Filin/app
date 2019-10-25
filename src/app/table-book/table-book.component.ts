import { Component, OnInit, SimpleChanges } from "@angular/core";
import { PaginateService } from "../shared/services/paginate.service";
import { Book } from "../shared/models/book";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

	initialPage: number = 1;
	
  constructor(private fb: FormBuilder) {
    this.pagination = new PaginateService(this.book.key);
  }

  ngOnInit() {
		this.tableBookForm = this.fb.group({
			nameBook: ["", Validators.required],
			authorBook: ["", Validators.required]
		})
    this.pageOfItems = this.pagination.initValue();
  }

	get f() { return this.tableBookForm.controls; }

	
	onPager(pagerChange){
		this.pagination.pager = pagerChange;
	}

	onCheckArray(value: number){
		this.pagination.checkArray(value);
	}

	onCheckChanges(changes: SimpleChanges){
		this.pagination.checkChanges(changes, this.initialPage);
	}

  onChangePage(page: number) {
    this.pageOfItems = this.pagination.setPage(page);
  }

  change(elem, key = KEY) {
    this.pagination.change(elem, key);
  }

  remove(elem, index) {
    this.pageOfItems = this.pagination.arrayRemovingElement(elem, index);
  }

  submit() {
		console.log()
		let book = new Book(this.tableBookForm.value.nameBook, this.tableBookForm.value.authorBook);
    this.pageOfItems = this.pagination.unshift(book, KEY);
  }
}

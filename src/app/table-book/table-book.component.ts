import { Component, OnInit, SimpleChanges } from "@angular/core";
import { PaginateService } from "../services/paginate.service";
import { Book } from "../models/book";

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
	protected pagination;

	initialPage: number = 1;
	
  constructor() {
    this.pagination = new PaginateService(this.book.key);
  }

  ngOnInit() {
    this.pageOfItems = this.pagination.initValue();
  }

	onCheckArray(value: number){
		this.pagination.checkArray(value);
	}

	onCheckChanges(changes: SimpleChanges){
		this.pagination.checkChanges(changes, this.initialPage);
	}

  onChangePage(page: number) {
		console.log(page)
    this.pageOfItems = this.pagination.setPage(page);
  }

  change(elem, key = KEY) {
    this.pagination.change(elem, key);
  }

  remove(elem, index) {
    this.pageOfItems = this.pagination.arrayRemovingElement(elem, index);
  }

  submit() {
    let book = new Book(this.book.name, this.book.author);
    this.pageOfItems = this.pagination.unshift(book, KEY);
  }
}

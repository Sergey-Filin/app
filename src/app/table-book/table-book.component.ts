import { Component, OnInit} from "@angular/core";
import { PaginateService } from '../services/paginate.service';
import { Book } from '../models/book';

@Component({
  selector: "app-table-book",
  templateUrl: "./table-book.component.html",
  styleUrls: ["./table-book.component.css"]
})
export class TableBookComponent implements OnInit {

	book: Book = new Book("book", "author");

	pageOfItems: Array<any>;

  constructor(private pagination: PaginateService) {
		this.pagination = new PaginateService();
	}

  ngOnInit() {
		this.pageOfItems = this.pagination.initValue();
	}

	onChangePage(pageOfItems) {
		this.pageOfItems = pageOfItems;
  }

  change(elem) {
    this.pagination.change(elem);
	}
	
  remove(index) {
    this.pageOfItems = this.pagination.arrayRemovingElement(index);
  }

  submit() {
		let book = new Book(this.book.name,this.book.author);
    this.pageOfItems = this.pagination.unshift(book); 
  }
}
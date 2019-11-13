import { Component, OnInit, SimpleChanges } from "@angular/core";
import { PaginateService } from "../shared/services/paginate.service";
import { Book } from "../shared/models/book";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalService } from "../shared/services/modal.service";
import { TableValueFull } from '../shared/interfaces';
import { ChangeTableService } from '../shared/services/changeTable.service';
const KEY = "BOOK";

@Component({
  selector: "app-table-book",
  templateUrl: "./table-book.component.html",
  styleUrls: ["./table-book.component.css"]
})
export class TableBookComponent implements OnInit {
	book: Book = new Book("", "");
	pageOfItems: TableValueFull[];
	tableBookForm: FormGroup;
	protected pagination;
	changeTableService: ChangeTableService;

	initialPage: number = 1;
	
  constructor(private fb: FormBuilder, private modalService: ModalService) {
		this.pagination = new PaginateService();
		this.changeTableService = new ChangeTableService();
  }

  ngOnInit() {
    this.tableBookForm = this.fb.group({
      nameBook: ["", Validators.required],
			authorBook: ["", Validators.required],
			searchStr: ["1111111111111111"]
		});
    this.pageOfItems = this.changeTableService.initValue();
  }

	get _nameBook(){
		return this.tableBookForm.get("nameBook");
	}

	get _authorBook(){
		return this.tableBookForm.get("authorBook");
	}

	get _searchStr(){
		return this.tableBookForm.get("searchStr");
	}

	onModalFormGroup(modalForm, key = KEY){
		this.changeTableService.change(modalForm.modalForm.modalNameBook, modalForm.modalForm.modalAuthorBook, modalForm.currentKey, key);
	}

	openModal(id: string, elem) {		
		elem.key = KEY + elem.value.nameBook + elem.value.authorBook;
		this.modalService.open(id, elem);
	}

  onCheckArray(value: number, array = this.changeTableService.array) {
		this.pagination.checkArray(value, array);
  }

  onCheckChanges(changes: SimpleChanges, array = this.changeTableService.array) {
    this.pagination.checkChanges(changes, this.initialPage, array);
  }

  onChangePage(page: number, array = this.changeTableService.array) {
    this.pageOfItems = this.pagination.setPage(array, page);
  }

  remove(elem, index) {
    this.pageOfItems = this.changeTableService.arrayRemovingElement(elem, index);
  }

  submit() {
    let book = new Book(
      this.tableBookForm.value.nameBook,
      this.tableBookForm.value.authorBook
    );
    this.pageOfItems = this.changeTableService.unshift(book, KEY);
  }
}

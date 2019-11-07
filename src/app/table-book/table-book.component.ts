import { Component, OnInit, SimpleChanges } from "@angular/core";
import { PaginateService } from "../shared/services/paginate.service";
import { Book } from "../shared/models/book";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalService } from "../shared/services/modal.service";
import { TableValueFull } from '../shared/interfaces';

const KEY = "BOOK";

@Component({
  selector: "app-table-book",
  templateUrl: "./table-book.component.html",
  styleUrls: ["./table-book.component.css"]
})
export class TableBookComponent implements OnInit {
	book: Book = new Book("", "");
	pageOfItems: TableValueFull;  // = new TableValueFull("",{"", ""});
  tableBookForm: FormGroup;
  protected pagination;

	initialPage: number = 1;
	
  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.pagination = new PaginateService();
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

	onModalFormGroup(modalForm, key = KEY){
		this.pagination.change(modalForm.modalForm.modalNameBook, modalForm.modalForm.modalAuthorBook, modalForm.currentKey, key);
	}

	openModal(id: string, elem) {			//  записать новое значение туда где изменяем || передать значение изменяемого елемента || привязка в реактивных формах 
		elem.key = KEY + elem.value.nameBook + elem.value.authorBook;
		this.modalService.open(id, elem);
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

import { Component, OnInit, SimpleChanges } from "@angular/core";
import { User } from "../shared/models/book";
import { UserValueFull } from "../shared/interfaces";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserChangeTableService } from "../shared/services/userChangeTable.service";
import { ModalService } from "../shared/services/modal.service";
import { PaginateService } from "../shared/services/paginate.service";
	
const KEY = "USER";

@Component({
  selector: "app-table-users",
  templateUrl: "./table-users.component.html",
  styleUrls: ["./table-users.component.css"]
})
export class TableUsersComponent implements OnInit {
  pageOfItems: UserValueFull[];
  userForm: FormGroup;
  protected pagination;
  userService: UserChangeTableService;

  initialPage: number = 1;

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.pagination = new PaginateService();
    this.userService = new UserChangeTableService();
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      email: ["",[Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}")]],
      phone: ["", [Validators.required, Validators.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)]]
    });
		this.pageOfItems = this.userService.initValue();
		console.log(this.pageOfItems)
  }

  get _name() {
    return this.userForm.get("name");
  }
  get _email() {
    return this.userForm.get("email");
  }
  get _phone() {
    return this.userForm.get("phone");
  }

  filter(value) {
    this.pageOfItems = this.userService.filter(value);
  }

  onCheckChanges(changes: SimpleChanges, array = this.userService.array) {
    this.pagination.checkChanges(changes, this.initialPage, array);
	}
	
	onCheckArray(value: number, array = this.userService.array) {
		this.pagination.checkArray(value, array);
	}
	
	onChangePage(page: number, array = this.userService.array) {			
		this.pageOfItems = this.pagination.setPage(array, page);
	}

	remove(elem, index) {
		this.pageOfItems = this.userService.arrayRemovingElement(elem, index);
	}

	submit(){
		let user = new User(this.userForm.value.name, this.userForm.value.email, this.userForm.value.phone);
		this.pageOfItems = this.userService.unshift(user, KEY);
	}

}
// 	onModalFormGroup(modalForm, key = KEY){
// 		this.changeTableService.change(modalForm.modalForm.modalNameBook, modalForm.modalForm.modalAuthorBook, modalForm.currentKey, key);
// 	}

// 	openModal(id: string, elem) {
// 		elem.key = KEY + elem.value.nameBook + elem.value.authorBook;
// 		this.modalService.open(id, elem);
// 	}

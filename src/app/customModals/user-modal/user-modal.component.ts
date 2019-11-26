import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.less']
})
export class UserModalComponent implements OnInit {
	@Input() id: string;
	// @Input() tableBookValue: any;
	private element: any;
  modalForm: FormGroup;
	@Output() modalFormGroup = new EventEmitter();
	
	currentElement;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private el: ElementRef
  ) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    this.modalForm = this.fb.group({
			modalName: ["", Validators.required],
			modalEmail: ["", [Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}")]],
      modalPhone: ["", [Validators.required, Validators.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)]]
    });

    if (!this.id) {
      console.error("modal must have an id");
      return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener("click", el => {
      if (el.target.className === "jw-modal") {
        this.close();
      }
    });
		this.modalService.add(this);
	}
	
	get _modalName() {
    return this.modalForm.get("modalName");
  }
	get _modalEmail() {
    return this.modalForm.get("modalEmail");
  }
	get _modalPhone() {
    return this.modalForm.get("modalPhone");
  }

	closeModal(id: string = this.id) {
		this.currentElement.value.name = this.modalForm.controls.modalName.value;
		this.currentElement.value.email = this.modalForm.controls.modalEmail.value;
		this.currentElement.value.phone = this.modalForm.controls.modalPhone.value;
		this.modalFormGroup.emit({modalForm: this.modalForm.value, currentKey: this.currentElement.key});
		this.modalService.close(id);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
		this.element.remove();
  }

  open(elem): void {
		this.modalForm.controls.modalName.setValue(elem.value.name);
		this.modalForm.controls.modalEmail.setValue(elem.value.email);
		this.modalForm.controls.modalPhone.setValue(elem.value.phone);
    this.element.firstElementChild.style.display = "block";
		document.body.classList.add("jw-modal-open");
		this.currentElement = elem;
  }

  close(): void {	
    this.element.firstElementChild.style.display = "none";
    document.body.classList.remove("jw-modal-open");
  }
}

import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { ModalService } from "../../shared/services/modal.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "jw-modal",
  templateUrl: "modal.component.html",
  styleUrls: ["modal.component.less"]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
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
			modalNameBook: ["", Validators.required],
      modalAuthorBook: ["", Validators.required]
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
	
	get _modalNameBook() {
    return this.modalForm.get("modalNameBook");
  }
	get _modalAuthorBook() {
    return this.modalForm.get("modalAuthorBook");
  }

	closeModal(id: string = this.id) {
		this.currentElement.value.nameBook = this.modalForm.controls.modalNameBook.value;
		this.currentElement.value.authorBook = this.modalForm.controls.modalAuthorBook.value;
		this.modalFormGroup.emit({modalForm: this.modalForm.value, currentKey: this.currentElement.key});
		this.modalService.close(id);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
		this.element.remove();
  }

  open(elem): void {
		this.modalForm.controls.modalNameBook.setValue(elem.value.nameBook);
		this.modalForm.controls.modalAuthorBook.setValue(elem.value.authorBook);
    this.element.firstElementChild.style.display = "block";
		document.body.classList.add("jw-modal-open");
		this.currentElement = elem;
  }

  close(): void {	
    this.element.firstElementChild.style.display = "none";
    document.body.classList.remove("jw-modal-open");
  }
}

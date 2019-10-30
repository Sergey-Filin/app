import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({ 
    selector: 'jw-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.less']
})
export class ModalComponent implements OnInit, OnDestroy {
    id: string;
		private element: any;
		modalForm: FormGroup;

		
    constructor(private fb: FormBuilder, private modalService: ModalService, private el: ElementRef) {
				this.element = el.nativeElement;
    }

    ngOnInit(): void {

			this.modalForm = this.fb.group({
				modalNameBook: ["", Validators.required],
				modalAuthorBook: ["", Validators.required]
			});



				if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        document.body.appendChild(this.element);

        this.element.addEventListener('click', el => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });
				console.log(this);
        this.modalService.add(this);
    }



    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

		open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}
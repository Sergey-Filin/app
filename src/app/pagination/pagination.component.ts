import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input
} from "@angular/core";
import { Pager } from "../shared/interfaces";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit, OnChanges {
	@Input() pager: Pager;
	@Output() initValue: EventEmitter<number> = new EventEmitter<number>(true);
  @Output() checkChanges: EventEmitter<SimpleChanges> = new EventEmitter<SimpleChanges>(true);
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>(true);
  constructor() {}

	page: number = 0;

  ngOnInit() {
    this.initValue.emit(1);
    // this.pagination.checkArray(this.initialPage);
	}
	
  nextPage() {
		this.page++;
		this.setPage(this.page);
  }

  previousPage() {
    this.page--;
		this.setPage(this.page);
  }

  lastPage() {
    this.page = this.pager.totalPages;
    this.setPage(this.page);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkChanges.emit(changes);
  }

  public setPage(page) {
    this.changePage.emit(page);
  }
}

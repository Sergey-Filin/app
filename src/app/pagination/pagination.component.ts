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
  @Output() pagerChange: any = new EventEmitter<Pager>(true);
  @Output() initValue: EventEmitter<number> = new EventEmitter<number>(true);
  @Output() checkChanges: EventEmitter<SimpleChanges> = new EventEmitter<SimpleChanges>(true);
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>(true);
  constructor() {}

	page: number = 0;

  ngOnInit() {
    this.initValue.emit(1);
    // this.pagination.checkArray(this.initialPage);
	}
	

	qwe( p: number = 0  ){
		

 	}

  nextPage() {
		this.page++;
		this.setPage(this.page);
  }

  previousPage() {
    let page = this.pager.currentPage - 1;
    this.pagerChange.emit(this.pager);
    this.setPage(page);
  }

  lastPage() {
    let page = this.pager.totalPages;
    this.pagerChange.emit(this.pager);
    this.setPage(page);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkChanges.emit(changes);
  }

  public setPage(page) {
    this.changePage.emit(page);
  }
}

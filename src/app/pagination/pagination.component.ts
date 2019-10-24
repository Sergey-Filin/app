import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input
} from "@angular/core";
import { PaginateService } from "src/app/services/paginate.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit, OnChanges {
	@Input() pager: object;
	@Output() initValue = new EventEmitter<number>(true);
	@Output() checkChanges = new EventEmitter<SimpleChanges>(true);
	@Output() changePage = new EventEmitter<number>(true);

  constructor() {}

  ngOnInit() {
		this.initValue.emit(1);
    // this.pagination.checkArray(this.initialPage);
  }

  ngOnChanges(changes: SimpleChanges) {
		this.checkChanges.emit(changes);
  }

  public setPage(page) {
		console.log(this.pager)
    this.changePage.emit(page);
  }
}

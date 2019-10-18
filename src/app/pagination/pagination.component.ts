import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { PaginateService } from "../services/paginate.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit, OnChanges {

  @Output() changePage = new EventEmitter<any>(true);

  initialPage = 1;
  pageSize = 10;
  maxPages = 10;

  constructor(protected pagination: PaginateService) {}

  ngOnInit() {
    this.pagination.checkArray(this.initialPage);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pagination.checkChanges(changes, this.initialPage);
  }

  private setPage(page: number, pageSize: number, maxPages: number) {
    let pageOfItems = this.pagination.setPage(page, pageSize, maxPages);
    this.changePage.emit(pageOfItems);
  }
}

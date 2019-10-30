import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TableBookComponent } from "./table-book/table-book.component";
import { TableUsersComponent } from "./table-users/table-users.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PaginationComponent } from "./pagination/pagination.component";
import { ModalComponent } from './modal/modal.component';
// import { ModalModule } from "./modal/modal.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableBookComponent,
    TableUsersComponent,
		PaginationComponent,
		ModalComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

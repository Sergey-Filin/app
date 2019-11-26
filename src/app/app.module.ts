import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TableBookComponent } from "./table-book/table-book.component";
import { TableUsersComponent } from "./table-users/table-users.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PaginationComponent } from "./pagination/pagination.component";
import { ModalComponent } from "./customModals/modal/modal.component";
import { AppRoutingModule } from "./app-routing.module";
import { UserModalComponent } from './customModals/user-modal/user-modal.component';

// import { ModalModule } from "./modal/modal.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableBookComponent,
    TableUsersComponent,
    PaginationComponent,
		ModalComponent,
		UserModalComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableBookComponent } from './table-book/table-book.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableBookComponent,
    TableUsersComponent,
		PaginationComponent,
		ModalComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule
  ],
  providers: [
	],
  bootstrap: [AppComponent]
})
export class AppModule { }

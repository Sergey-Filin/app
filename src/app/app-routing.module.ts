import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { TableBookComponent } from './table-book/table-book.component';


const routes: Routes = [
	{path: "dashboard", component: DashboardComponent},
	{path: "tableusers", component: TableUsersComponent},
	{path: "tablebooks", component: TableBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

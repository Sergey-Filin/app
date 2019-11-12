import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  links = [
    { url: "/dashboard", name: "Дашборд" },
    { url: "/tableusers", name: "Таблица пользователей" },
    { url: "/tablebooks", name: "Таблица книг" }
  ];
}

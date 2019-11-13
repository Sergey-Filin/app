import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  links = [
    { url: "/dashboard", name: "Dashboard" },
    { url: "/tableusers", name: "User table" },
    { url: "/tablebooks", name: "Book table" }
  ];
}

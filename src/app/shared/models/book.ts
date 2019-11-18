export class Book {
  key: String;

  constructor(public name: string, public author: string) {
    this.key = name + author;
  }
}

export class User {
  key: String;
  constructor(public name: string, public email: string, public phone: number) {
    this.key = name + email + phone;
  }
}

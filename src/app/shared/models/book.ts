export class Book {
  key: String;

  constructor(public name: string, public author: string) {
    this.key = name + author;
  }
}


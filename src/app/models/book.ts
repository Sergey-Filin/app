export class Book implements Keyable {
  key: String;

  constructor(public name: string, public author: string) {
    this.key = name + author;
  }
}

export interface Keyable {
  key: String;
}

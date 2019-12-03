const enum enumType {
  returned = 0,
  taked
}

class Transatcion {
	id: AutoincrementId;
	date: Date;
  userId: string;
  bookId: string;
  type: enumType;

  constructor(date: Date, userId: string, bookId: string, type: enumType) {
    this.date = date;
    this.userId = userId;
    this.bookId = bookId;
    this.type = type;

    this.id = new AutoincrementId("secret");
    this.id.value++;
	}	
}

class AutoincrementId {
  key: string;
  value: number = 0;

  constructor(str: string) { 	
    this.key = str;
  }
}

let p = new Transatcion(new Date(), "asd", "asd", 123)

console.log(p);
export class Pager {
  constructor(
    public totalItems: number,
    public currentPage: number,
    public pageSize: number,
    public totalPages: number,
    public startPage: number,
    public endPage: number,
    public startIndex: number,
    public endIndex: number,
    public pages: Array<number>
  ) {}
}

export class TableValue {
  constructor(public nameBook: string, public authorBook: string) {}
}

export class TableValueFull {
  constructor(
    public key: string,
    public value: {
      nameBook: string;
      authorBook: string;
    }
  ) {}
}

export class UserValueFull {
  constructor(
    public key: string,
    public value: {
      name: string;
      email: string;
			phone: number;
    }
  ) {}
}

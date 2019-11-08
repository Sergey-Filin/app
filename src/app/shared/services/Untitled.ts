abstract class A {

	abstract getAge(): number;

	getFull():string
	{
		let age = this.getAge();
		return "Мне " + age + " лет.";
	}
}

class B extends A {
	getAge(): number {
		return 12;
	}
}

class C extends A {
	getAge(): number {
		return 77;
	}
}


let aa = new B();
let text = aa.getFull();
console.log(text);



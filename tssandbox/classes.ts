interface UserInterface {
  name: string;
  email: string;
  age: number;
  currentUser(): string;
  payInvoice(): void;
}

// Interface define public contracts and doesn't make sense to have protected or private modifiers.
class User implements UserInterface {
  private name: string;
  private email: string;
  private age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  currentUser(): string {
    return `${this.name}'s email: ${this.email}`;
  }

  payInvoice() {
    console.log("Paid Invoice");
  }
}

let john = new User("John", "test@gmail.com", 11);

console.log(john.currentUser());

// console.log(john.age);

// Inheritence
class Member extends User {
  id: number;

  constructor(id: number, name: string, email: string, age: number) {
    super(name, email, age);
    this.id = id;
  }

  payInvoice() {
    super.payInvoice();
  }
}

let mike: User = new Member(1, "mike", "mike@gmail.com", 21);
mike.payInvoice();

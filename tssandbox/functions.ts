function getSum(a: number, b: number): number {
  return a + b;
}

let mySum = function(a: number, b: any): number {
  let num2;
  if (typeof b === "string") {
    num2 = parseInt(b);
  }
  return a + num2;
};

//console.log(mySum(1, "3"));

function getName(first: string, last?: string): string {
  return last ? `${first} ${last}` : first;
}

console.log(getName("Michael"));

// cannot declare as myVoid because it is already declared in another file
// This problem would not occur if they are declared as modules
function myvoid(): void {
  return;
}

function getSum(a, b) {
    return a + b;
}
var mySum = function (a, b) {
    var num2;
    if (typeof b === "string") {
        num2 = parseInt(b);
    }
    return a + num2;
};
//console.log(mySum(1, "3"));
function getName(first, last) {
    return last ? first + " " + last : first;
}
console.log(getName("Michael"));
// cannot declare as myVoid because it is already declared in another file
// This problem would not occur if they are declared as modules
function myvoid() {
    return;
}

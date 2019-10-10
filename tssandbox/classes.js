var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Interface define public contracts and doesn't make sense to have protected or private modifiers.
var User = /** @class */ (function () {
    function User(name, email, age) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    User.prototype.currentUser = function () {
        return this.name + "'s email: " + this.email;
    };
    User.prototype.payInvoice = function () {
        console.log("Paid Invoice");
    };
    return User;
}());
var john = new User("John", "test@gmail.com", 11);
console.log(john.currentUser());
// console.log(john.age);
// Inheritence
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member(id, name, email, age) {
        var _this = _super.call(this, name, email, age) || this;
        _this.id = id;
        return _this;
    }
    Member.prototype.payInvoice = function () {
        _super.prototype.payInvoice.call(this);
    };
    return Member;
}(User));
var mike = new Member(1, "mike", "mike@gmail.com", 21);
mike.payInvoice();

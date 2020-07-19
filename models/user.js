// plugin the passport-local-mongoose middleware with our User schema
User.plugin(passportLocalMongoose)

let Person = new Schema({
    firstName: String,
    lastName: String
    });

Person.methods.fullName = function() {
    return `${this.firstName} ${this.lastName}`;
}
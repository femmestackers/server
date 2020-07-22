const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = 
require("passport-local-mongoose")




let User = new Schema({
    name: String,
    email: {
		type: String,
		required: true
	}

    });

// plugin the passport-local-mongoose middleware with our User schema
User.plugin(passportLocalMongoose)    

User.methods.newUser = function() {
    return `${this.name} ${this.email}`;
}

module.exports = mongoose.model("User", User)

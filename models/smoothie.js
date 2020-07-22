const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Smoothie = new Schema ({
    username: {
    type: String
    },

    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Object,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 250,
    },
    fyi: {
      type: String
    },
    comments: [{
      username: String,
      comment: String
  }]
    

})


module.exports = mongoose.model("Smoothie", Smoothie)
//create a seed file, make sure it works on local, deploy to atlas and test from local server to atlas,update deployed server to pull data from database(set env variables for heroku)
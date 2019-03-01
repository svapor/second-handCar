var mongoose = require("mongoose");

module.exports = mongoose.model("user",new mongoose.Schema({
    id: Number,
    name: String,
    age:Number,
    tel:String
}))
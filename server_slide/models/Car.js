var mongoose = require("mongoose");

//mongoose在这里的nodejs创建的表名叫“Car”，但是到了数据库中会自动加s，变成“Cars”
module.exports = mongoose.model("car",{

    //数据库结构（Schema）
    brand: String,
    buydate: Number,
    color: String,
    displacement: String,
    environmental: String,
    fuel: String,
    gearbox: String,
    id: Number,
    images: Object,
    km: Number,
    licence: Boolean,
    locality: Boolean,
    price: Number,
    series: String,
    type: String
})
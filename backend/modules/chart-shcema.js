const mogoose = require('mongoose');

const chartSchema = new mogoose.Schema({
    type: String,
    sexual: Number,
    guns: Number,
    money: Number,
    dataBase: Number,
    other: Number
});

module.exports = mogoose.model("chart", chartSchema);
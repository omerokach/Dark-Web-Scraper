const mogoose = require('mongoose');

const chartSchema = new mogoose.Schema({
    type: String,
    sexual: Number,
    violence: Number,
    money: Number,
    dataBase: Number,
    other: Number,
    sumVals: Number
});

module.exports = mogoose.model("chart", chartSchema);
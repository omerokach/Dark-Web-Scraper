const mogoose = require('mongoose');

const userScheman = new mogoose.Schema({
    name: String,
    email: String,
    picture: String,
    interval: Number,
    keyWords: [String]
});

module.exports = mogoose.model("User", userScheman);
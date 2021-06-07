const mogoose = require('mongoose');

const userScheman = new mogoose.Schema({
    name: String,
    email: String,
    picture: String,
    keyWords: [String]
});

module.exports = mogoose.model("User", userScheman);
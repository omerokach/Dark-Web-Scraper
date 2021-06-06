const mogoose = require('mongoose');

const postSchema = new mogoose.Schema({
    title: String,
    body: String,
    author: String,
    date: String
});

module.exports = mogoose.model("Post", postSchema);
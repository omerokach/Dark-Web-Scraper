const mogoose = require('mongoose');

const postSchema = new mogoose.Schema({
    title: String,
    tags: String,
    body: String,
    author: String,
    date: String
});

module.exports = mogoose.model("Post", postSchema);
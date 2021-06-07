    const Post = require('../modules/post-schema');

    module.exports.posts_get = async (req,res) =>{
        try {
           const posts =  await Post.find({});
           const postsSorted = posts.sort((a,b) => new Date(a) - new Date(b));
           res.status(200).json(postsSorted)     
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
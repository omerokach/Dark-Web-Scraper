const Post = require('../modules/post-schema');

const addPost = async (postsArray) => {
    for(const post of postsArray){
        const findPost = await Post.find({body: post.body});
        if(findPost.length === 0){
            try {
                const res = await Post.create(post); 
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return;
}

module.exports = addPost;
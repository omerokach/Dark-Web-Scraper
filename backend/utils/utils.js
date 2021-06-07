const Post = require("../modules/post-schema");
const User = require("../modules/user-schema");

const ifExistUser = async (email) => {
  const ifExist = await User.find({ email: email });
  return ifExist;
};

const addPost = async (postsArray) => {
  for (const post of postsArray) {
    const findPost = await Post.find({ body: post.body, title: post.title });
    if (findPost.length === 0) {
      try {
        const res = await Post.create(post);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return;
};

module.exports = { addPost, ifExistUser };

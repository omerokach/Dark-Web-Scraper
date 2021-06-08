const Post = require("../modules/post-schema");
const User = require("../modules/user-schema");
const axios = require("axios");
const scraperStatus = {
  status : "success",
  newPosts: [],
  newPostsLength: 0
};

const cheerio = require("cheerio");

const ifExistUser = async (email) => {
  const ifExist = await User.find({ email: email });
  return ifExist;
};

const addPost = async (postsArray) => {
  const newPosts = [];
  for (const post of postsArray) {
    const findPost = await Post.find({ body: post.body, title: post.title });
    if (findPost.length === 0) {
      try {
        newPosts.push(post)
        const res = await Post.create(post);
      } catch (error) {
        console.log(error);
      }
    }
  }
  scraperStatus.status = 'success'
  scraperStatus.newPosts = newPosts
  scraperStatus.newPostsLength = newPosts.length
  return;
};

const scraper = async () => {
  try {
    const response = await axios.get("http://nzxj65x32vh2fkhk.onion/all", {
      proxy: {
        host: "localhost",
        port: 8118,
      },
    });
    const totalPostsArray = [];
    const $ = cheerio.load(response.data);
    $(".col-sm-5").each((i, element) => {
      let titleString = JSON.stringify($(element).text());
      let newstr = titleString.replace(/\\t|\\n|"/g, (match) => {
        return "";
      });
      totalPostsArray.push({ title: newstr });
    });
    $("ol").each((i, element) => {
      totalPostsArray[i].body = $(element)
        .children()
        .text()
        .replace(/\s\s+/g, " ");
    });
    $("div[class=col-sm-6]:not(.text-right)").each((i, element) => {
      let elementText = JSON.stringify($(element).text()).replace(
        /\\t|\\n/g,
        (match) => {
          return "";
        }
      );
      const author = elementText.match(/(?<=(by ))(.*?)(?= (at))/g);
      const at = elementText.match(/(?<=(at ))(.*?)(?=")/g);
      if (
        author === "Anonymous" ||
        author === "Unknown" ||
        author === "Guest"
      ) {
        author = "Anonymous";
      }
      totalPostsArray[i].author = author[0];
      totalPostsArray[i].date = at[0];
    });
    await addPost(totalPostsArray);
    return "success"
  } catch (error) {
    scraperStatus.status = 'failed'
    scraperStatus.newPosts = []
    scraperStatus.newPostsLength = 0
    console.log(error);
    return error
  }
};

module.exports = { addPost, ifExistUser, scraper, scraperStatus };

const axios = require("axios");
const cheerio = require("cheerio");
const addPost = require('../utils/utils')

module.exports.dataGet = async (req, res) => {
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
    res.send(totalPostsArray);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

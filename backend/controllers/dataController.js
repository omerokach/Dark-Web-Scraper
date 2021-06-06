const axios = require("axios");
const cheerio = require("cheerio");

module.exports.dataGet = async (req, res) => {
  try {
    const response = await axios.get("http://nzxj65x32vh2fkhk.onion/all", {
      proxy: {
        host: "localhost",
        port: 8118,
      },
    });
    const totalDataArray = [];
    const $ = cheerio.load(response.data);
    $(".col-sm-5").each((i, element) => {
      let string = JSON.stringify($(element).text());
      console.log(string);
      let newstr = string.replace(/\\t|\\n|"/g, (match) => {
        return "";
      });
      totalDataArray.push({ title: newstr });
    });
    $("ol").each((i, element) => {
      totalDataArray[i].body = $(element)
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
      const by = elementText.match(/(?<=(by ))(.*?)(?= (at))/g);
      const at = elementText.match(/(?<=(at ))(.*?)(?=")/g);
      totalDataArray[i].author = by[0];
      totalDataArray[i].date = at[0];
    });
    console.log(totalDataArray);
    res.send(totalDataArray);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

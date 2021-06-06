const axios = require("axios");

module.exports.dataGet = async (req, res) => {
  try {
    const response = await axios.get("http://nzxj65x32vh2fkhk.onion/all", {
      proxy: {
        host: "localhost",
        port: 8118,
      },
    });
    console.log(response);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

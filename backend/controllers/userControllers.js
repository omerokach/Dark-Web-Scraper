const { ifExistUser } = require("../utils/utils");
const User = require("../modules/user-schema");

module.exports.user_post = async (req, res) => {
  const { email } = req.body;
  req.body.interval = 2;
  const ifExist = await ifExistUser(email);
  if (ifExist.length === 0) {
    console.log(ifExist);
    try {
      const res = await User.create(req.body);
      console.log(res);
      return res.status(200).send("User added succesfully");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(409).send("User already exist");
  }
};

module.exports.addKeyWords = async (req, res) => {
  const { userEmail, keyWordsArr } = req.body;
  console.log(keyWordsArr);
  try {
    let user = await User.findOneAndUpdate(
      { email: userEmail },
      { keyWords: keyWordsArr },
      {
        new: true,
      }
    );
    if (!user) {
      throw "No user with this email";
    }
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    if (error === "No user with this email") {
      return res.status(409).send(error);
    } else {
      console.log(error.message);
      return res.status(500).send(error);
    }
  }
};

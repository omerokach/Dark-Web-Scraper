const { ifExistUser } = require("../utils/utils");
const User = require("../modules/user-schema");

module.exports.user_post = async (req, res) => {
  const { email } = req.body;
  req.body.interval = 2;
  req.body.keyWords = [];
  const ifExist = await ifExistUser(email);
  if (ifExist.length === 0) {
    try {
      await User.create(req.body);
      return res.status(200).send("User added succesfully");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  } else {
    res.status(201).send("User already exist");
  }
};

module.exports.getKeyWords = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw "No user with this email";
    }
    res.status(200).json({ userKeyWords: user.keyWords });
  } catch (error) {
    if (error === "No user with this email") {
      return res.status(404).send(error);
    } else {
      console.log(error.message);
      return res.status(500).send(error);
    }
  }
};

module.exports.addKeyWords = async (req, res) => {
  const { userEmail, keyWordsArr } = req.body;
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

let intervalMin = 2;
const User = require("../modules/user-schema");

const updateInterval = async (req, res) => {
  const { interval, userEmail } = req.body;
  intervalMin = interval;
  await User.findOne({ email: userEmail }, (err, doc) => {
    if (doc) {
      doc.interval = interval;
      doc.save();
    } else {
      console.log(err);
    }
  });
};

const getInterVal = async (req, res) => {
  console.log(req.params);
  const { userEmail } = req.params;
  console.log(userEmail);
  try {
    const user = await User.findOne({ email: userEmail });
    console.log(user);
    if (!user.email) {
      throw "No user with this email";
    } else {
      if (!user.interval) {
        return res.status(200).send("2");
      } else {
        return res.status(200).json({interval: user.interval});
      }
    }
  } catch (error) {
    if (error === "No user with this email") {
      return res.status(409).send(error);
    } else {
      return res.status(500).send(error.message);
    }
  }
};

module.exports = { updateInterval, intervalMin, getInterVal };

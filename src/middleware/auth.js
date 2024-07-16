const bcrypt = require("bcrypt");
const User = require("../users/model");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
// putting a + sign will also convert the string to number //

const hashPass = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    req.body.password = hashedPassword;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message, err });
  }
};

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const passwordVerify = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordVerify) {
      return res.status(404).json({ message: "Password is incorrect" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, err });
  }
};

module.exports = {
  hashPass,
  comparePass,
};

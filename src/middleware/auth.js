const bcrypt = require("bcrypt");
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

module.exports = {
  hashPass,
};

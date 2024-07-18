const bcrypt = require("bcrypt");
const User = require("../users/model");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
// putting a + sign will also convert the string to number //
const jwt = require("jsonwebtoken");
const { UnknownConstraintError } = require("sequelize");
const secret = process.env.SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

const isValidData = async (req, res, next) => {
  try {
    const regexEmail = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{3,20}$/;
    req.body.username = req.body.username.toLowerCase();

    if (!req.body.username) {
      res.status(422).json({ message: "Please provide a valid username" });
      return;
    } else if (!regexEmail.test(req.body.email)) {
      res.status(422).json({ message: "Invalid email format" });
      return;
    } else if (!regexPass.test(req.body.password)) {
      res.status(422).json({ message: "Invalid password" });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message, err: err });
  }
};

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
    const user = await User.findOne({
      where: { username: req.body.username },
    });
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

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({ message: "Token not provided" });
    }

    const authenticateToken = await jwt.verify(token, secret);

    const user = {
      id: authenticateToken.id,
      username: req.body.username,
      token: token,
    };

    req.authCheck = user;
    next();
  } catch (err) {
    res.status(403).json({ message: err.message, err });
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: "Token not provided" });
    }

    const authRefreshToken = jwt.verify(refreshToken, refreshSecret);

    const user = await User.findOne({
      where: { id: authRefreshToken.id, refreshToken: refreshToken },
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    req.authCheck = user;
    next();
  } catch (err) {
    res.status(403).json({ message: err.message, err });
  }
};

const authoriseAdmin = (req, res, next) => {
  if (req.authCheck && req.authCheck.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin only!" });
  }
};

module.exports = {
  isValidData,
  hashPass,
  comparePass,
  verifyToken,
  verifyRefreshToken,
  authoriseAdmin,
};

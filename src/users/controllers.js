const User = require("./model");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("sequelize");

const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: "You have signed up successfully",
      username: user.username,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: "Validation error", errors: err.errors });
    } else {
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }
};

const logIn = async (req, res) => {
  try {
    if (req.authCheck) {
      return res.status(201).json({ message: "success", user: req.authCheck });
    }

    const accessToken = await jwt.sign({ id: req.user.id }, process.env.SECRET);

    const user = {
      id: req.user.id,
      username: req.user.username,
      token: accessToken,
    };

    res.status(201).json({
      message: "You have logged in successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, err: err });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
  } catch (err) {
    res.status(403).json({ message: err.message, err });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).json({ message: "success", users: users });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    res.status(200).json({ message: "success", user: user });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

const updateInfo = async (req, res) => {
  try {
    const filterObj = { username: req.body.username };
    const updateObj = { [req.body.updateKey]: req.body.updateValue };

    const [updated] = await User.update(updateObj, {
      where: filterObj,
    });

    if (updated) {
      const updatedInfo = await User.findOne({ where: filterObj });
      res.status(200).json({ message: "success", updatedInfo: updatedInfo });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  signUp,
  logIn,
  getAllUsers,
  getUser,
  updateInfo,
};

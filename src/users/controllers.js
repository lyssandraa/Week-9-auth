const User = require("./model");

const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: "You have signed up successfully",
      username: user.username,
    });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

const logIn = async (req, res) => {
  try {
    res.status(201).json({
      message: "You have logged in successfully",
      username: req.user,
    });
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "success", users: users });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

const updateInfo = async (req, res) => {
  try {
    const filterObj = { username: req.body.username };
    const updateObj = { [req.body.updateKey]: req.body.updateValue };

    await User.update(updateObj, {
      where: filterObj,
    });

    const updatedInfo = await User.findOne({ where: filterObj });

    res.status(200).json({ message: "success", updatedInfo: updatedInfo });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

module.exports = {
  signUp,
  logIn,
  getUser,
  getAllUsers,
  updateInfo,
};

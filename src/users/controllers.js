const { req, request } = require("express");
const User = require("./model");

const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "success", user: user });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
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

module.exports = {
  addUser,
  getUser,
  getAllUsers,
};

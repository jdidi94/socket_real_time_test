const { User } = require("../models/db");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name } = req.body;
  const user = await User.create({ name });
  res.json({ id: user.id });
};

exports.loginUser = async (req, res) => {
  const { name } = req.body;
  const user = await User.findOne({ where: { name } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const token = jwt.sign({ id: user.id, name: user.name }, "your_secret_key");
  res.json({ token });
};

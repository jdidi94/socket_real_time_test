const { Post, User } = require("../models/db");
const jwt = require("jsonwebtoken");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.findAll({
    include: { model: User },
  });
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const { name, description } = req.body;
    const post = await Post.create(
      { name, description, UserId: decoded.id },
      { include: { model: User } }
    );
    const currentPost = await Post.findByPk(post.id, {
      include: { model: User },
    });
    res.json(currentPost);

    // Emit the new post to connected clients
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

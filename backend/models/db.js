const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("myapp", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
const User = require("./userModel")(sequelize, DataTypes);
const Post = require("./postModel")(sequelize, DataTypes);
User.hasMany(Post);
Post.belongsTo(User);

module.exports = { sequelize, User, Post };

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "posts",
      timestamps: false,
    }
  );
  return Post;
};

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

const Book = sequelize.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  { timestamps: false, indexed: [{ unique: true, fields: ["title"] }] }
);

module.exports = Book;

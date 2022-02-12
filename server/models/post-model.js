const { DataTypes } = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
})

module.exports = Post

const { DataTypes } = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
})

module.exports = Comment

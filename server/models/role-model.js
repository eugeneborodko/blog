const { DataTypes } = require('sequelize')
const db = require('../db')

const Role = db.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
})

module.exports = Role

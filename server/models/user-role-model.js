const { DataTypes } = require('sequelize')
const db = require('../db')

const UserRole = db.define('user_role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

module.exports = UserRole

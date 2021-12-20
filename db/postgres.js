const {Sequelize} = require('sequelize')
require('dotenv').config()

const user = process.env.POSTGRES_USER
const pass = process.env.POSTGRES_PASS

const sequelize = new Sequelize(`postgres://${user}:${pass}@localhost:5432/postgres`)

module.exports = sequelize
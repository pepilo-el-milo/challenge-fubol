const express = require('express')
const seedRouter = require('./routes/index')

const app = express()

app.use(express.json())
app.use(seedRouter)

module.exports = app
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../db/postgres')
const Team = require('./equipo')

const Player = sequelize.define('jugadores',{
    id:{
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    team:{
        type: DataTypes.UUIDV4,
        allowNull: true
    },
    speed:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stamina:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mentality:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    control:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Player
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../db/postgres')

const Partido = sequelize.define('partidos', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    teamone: {
        type: DataTypes.UUIDV4,
        allowNull: false
    },
    scoreone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teamtwo: {
        type: DataTypes.UUIDV4,
        allowNull: false
    },
    scoretwo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Partido
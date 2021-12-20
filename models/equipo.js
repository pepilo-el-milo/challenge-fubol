const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../db/postgres')
const Player = require('./jugador')

const Team = sequelize.define('equipos', {
    id:{
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false
    },
    leader: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false
})

// Team.hasMany(Player, {as: 'equipos', foreignKey: 'team'});

module.exports = Team
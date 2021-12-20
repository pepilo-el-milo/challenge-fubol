const {Player, Team} = require('../models/index')
const faker = require('faker')
const { v4 } = require('uuid')
const { request } = require('express')
const { response } = require('../app')

const createRandomTeam = async(req = request, res= response) => {

    try {
        const count = await Team.findAll()

        if (count.length >= 8){
            return res.status(500).json({
                msg: 'No se pueden crear más equipos - Máximo 8 equipos'
            })
        }

        const id = v4()
        const newEquipo = await Team.create({
            id,
            name: `${faker.commerce.color().toUpperCase()} ${faker.random.word().toUpperCase()}S`,
            country: faker.address.country(),
            leader: faker.name.findName()
        })

        console.log('Se creo equipo')

        let players = []

        for(let i = 0; i < 11; i++){
            const playerId = v4()
            const player = await Player.create({
                id: playerId,
                name: faker.name.findName(),
                team: newEquipo.id,
                speed: Math.floor(Math.random() * 11),
                stamina: Math.floor(Math.random() * 11),
                mentality: Math.floor(Math.random() * 11),
                control: Math.floor(Math.random() * 11)
            })
            players.push(player)
        }

        console.log('Se crearon los jugadores')

        return res.status(201).json({
            newEquipo,
            players
        })
    } catch(err){
        return res.status(500).json({
            msg: 'Error interno',
            err
        })
    }
    
}

module.exports = {
    createRandomTeam
}
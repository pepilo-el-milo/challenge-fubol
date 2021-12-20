const { request, response } = require('express')
const {Player, Team, Partidos} = require('../models/index')
const { v4 } = require('uuid')

const crearTorneo = async(req = request, res = response) =>{
    try {
        let teams = await Team.findAll()
        teams = teams.map((team) => {
            return {
                ...team.toJSON(),
                wins: 0
            }
        })
        let partidos = []
        for(let i = 0; i < 7; i++){
            let tmpTeams = [...teams]
            while(tmpTeams.length > 0){
                const partidoId = v4()

                if(tmpTeams.length === 1){
                    let defaultTeam = tmpTeams.splice(0,1)[0]
                    teams.find((s) => s.id === defaultTeam.id).wins++
                }
                let team1 = tmpTeams.splice(Math.floor(Math.random()* tmpTeams.length),1)[0]
                let team2 = tmpTeams.splice(Math.floor(Math.random()* tmpTeams.length),1)[0]

                let team1Score = Math.floor(Math.random() * 6)
                let team2Score = Math.floor(Math.random() * 6)
                console.log(team1Score, team2Score)

                let winner = (team1Score > team2Score) ? '1': (team1Score < team2Score) ? '2' : '0'

                if(winner !== '0'){
                    teams.find((s) => s.id === (winner === '1') ? team1.id : team2.id).wins++
                }

                await Partidos.create({
                    id: partidoId,
                    teamone: team1.id,
                    scoreone: team1Score,
                    teamtwo: team2.id,
                    score: team2Score,
                    result: winner
                })

            }
        }
        
        return res.status(200).json({
            teams
        })
    } catch(err){
        return res.status(500).json({
            msg: 'Ocurrio un error interno',
            err
        })
    }
}

module.exports = {
    crearTorneo
}
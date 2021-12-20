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
        let mensaje= ``
        for(let i = 0; i < 7; i++){
            let tmpTeams = [...teams]
            mensaje += `
            =====================
            Week ${i+1}
            =====================`
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

                mensaje += `\n${team1.name} vs ${team2.name}: ${team1Score} - ${team2Score}`

                let winnerTeam = (team1Score > team2Score) ? team1: (team1Score < team2Score) ? team2 : null

                if(winnerTeam){
                    teams.find((s) => s.id === winnerTeam.id).wins++
                }

                let partido = await Partidos.create({
                    id: partidoId,
                    teamone: team1.id,
                    scoreone: team1Score,
                    teamtwo: team2.id,
                    scoretwo: team2Score,
                    result: (winnerTeam) ? (winnerTeam.id === team1.id) ? '1' : '2' : '0'
                })

            }
        }

        mensaje += `
        ===============
        Total Wins Results
        ===============
        `
        teams.forEach((t) => mensaje += `\n${t.name} - ${t.wins}`)
        
        return res.status(200).send(mensaje)
    } catch(error){
        return res.status(500).json({
            msg: 'Ocurrio un error interno',
            error
        })
    }
}

module.exports = {
    crearTorneo
}
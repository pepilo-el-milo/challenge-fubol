const {Router} = require('express')
const { createRandomTeam } = require('../services/seed_gfsl')
const { crearTorneo} = require('../services/tournament')

const router = Router()

router.post('/createRandomTeam', createRandomTeam)
router.get('/createTournament',crearTorneo)

module.exports = router
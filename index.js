const app = require('./app')
const faker = require('faker')
const sequelize = require('./db/postgres')
require('dotenv').config()

sequelize.authenticate()
.then(()=>{
    console.log('Conectado correctamente')
    app.listen(process.env.PORT, ()=>{
        console.log(`Escuchando puerto ${process.env.PORT}`)
        
    })
}).catch((err)=> {
    console.error(err)
})

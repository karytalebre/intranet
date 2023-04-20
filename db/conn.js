const { Sequelize  } = require('sequelize')

const sequelize = new Sequelize('tought2', 'root', '$BDport@L$4', {
    host:'localhost',
    dialect:'mysql',
})

try {
    
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch (error) {
    console.log(`Não foi possiível conectar: ${err}`)
}

module.exports = sequelize
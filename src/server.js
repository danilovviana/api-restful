const express = require('express')
    // const path = require('path')

// const db = require('./database')
const routes = require('./routes/routes')

const app = express()

// conexao com banco de dados
// db.connect()


// habilita server para receber dados via post (formulário)
app.use(express.urlencoded({ extended: true }))

// definindo as routas
app.use('/api', routes)

// executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))
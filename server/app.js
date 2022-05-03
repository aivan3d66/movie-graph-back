const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 3005

require('dotenv').config()

mongoose
    .connect('mongodb+srv://aivan3d66:123qwe@cluster0.idipw.mongodb.net/graphql?retryWrites=true&w=majority')
    .then((res) => console.log('Connected to Mongo DB'))
    .catch(error => console.log(error))

app.use(cors())
app.use(
    '/graphql',
    graphqlHTTP(async (request, response, graphQLParams) => ({
        schema: schema,
        graphiql: true,
    })),
)

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

app.listen('https://movie-graph-server.herokuapp.com', err => {
    err ? console.log(err) : console.log('Server started!')
})

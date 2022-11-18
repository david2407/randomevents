const express = require('express')
const cors = require('cors')
const app = express()
const { graphqlHTTP } = require('express-graphql');
const eventsRouter = require('./routes/eventRouter')

const PORT = process.env.PORT || 4000

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/', eventsRouter)

//Graph imports
const schema = require('./graphql/schema')
const root = require('./graphql/resolver')

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log('running on express + graphql server on port  ' + PORT)
})
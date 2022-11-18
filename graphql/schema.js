const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Event {
    id: ID!,
    user: String,
    email: String,
    date: String
},
  type Query {
    getEvents: [Event], 
    getEventsByEmail(email: String) : [Event]
  }
`);

module.exports = schema
# How to run app

npm install -- get dependencies

npm start -- run server express and the graphql 

# Run app endpoint with 5 users every hour

node sender.js 

This file exec every 20 minutes a get enpoint for ramdon events per user generation and storage into farestore database

there is a constant in the file with users, email and the quantity (quantity is 500 by default)

endpoint: 

GET http://localhost:4000/getAll -- get all events collections from firestore

GET http://localhost:4000/randomevents -- create ramsom n events per user. It has 3 query strings (user, email, quantity) 

POST http://localhost:4000/events -- store events into firestore and run logic to check if add or remove events

GET http://localhost:4000/getByUser/:user -- get all events by user

GET http://localhost:4000//getByEmail/:email -- get all events by email


# Graphql 

http://localhost:4000/graphql graphiQL front

You have two posible Querys

-getEvents

{getEvents{
  user
  email
  id
  date
}}

-getEventsByEmail(email: String)

{getEventsByEmail(email: "davidemail1@gmail.com"){
  user
  email
  id
}}

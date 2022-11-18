const express = require('express')
const router = express.Router()
const utils = require('../utils')
const admin = require('firebase-admin')
const credentials = require("../key.json")

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

const PORT = process.env.PORT || 4000

router.get('/randomevents', (req, res) => {
    const { user, email, quantity = 500 } = req.query;

    const arr = utils.fillRandomArray(quantity)

    const object = utils.arrToEventsObject(arr, user, email)

    res.send(object)
})


router.post('/events', async (req, res) => {

    const { user, email, quantity } = req.query

    let arrayEvents = []
    fetch(`http://localhost:${PORT}/randomevents?user=${user}&email=${email}&quantity=${quantity}`)
        .then(res => res.json())
        .then(json => arrayEvents = [...json])
        .catch(err => console.log(err))

    if (!arrayEvents || !user || !email) {
        res.send("Request error")
    }

    const calendarRef = db.collection("events")
    const response = await calendarRef.where("user", "==", user).get()

    const arrayResponse = []
    response.forEach(doc => {
        arrayResponse.push(doc.data())
    })

    const notRemoveElements = []

    try {
        arrayEvents.map(event => {
            const { email, id } = event;

            if (!arrayResponse.find(x => x.user === user && x.id === id)) {
                const calendarEvent = {
                    id,
                    user,
                    email,
                    date: Date.now()
                }
                db.collection("events").doc(user + id).set(calendarEvent)
            } else {
                notRemoveElements.push(user + id)
            }

        })

        const removeElements = arrayResponse.filter(x => !notRemoveElements.includes(x.user + x.id))

        removeElements.forEach(element => {
            db.collection("events").doc(element.user + element.id).delete()
        })

        res.send("Events were saved successfully")
    } catch (error) {
        res.send(error)
    }
})


router.get('/getAll', async (req, res) => {

    try {
        const calendarRef = db.collection("events")
        const response = await calendarRef.get()
        let responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr.sort())

    } catch (error) {
        res.send(error)
    }
})

router.get('/getByUser/:user', async (req, res) => {
    const { user } = req.params

    try {
        const calendarRef = db.collection("events")
        const response = await calendarRef.where("user", "==", user).get()
        let responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr.sort())

    } catch (error) {
        res.send(error)
    }
})

router.get('/getByEmail/:email', async (req, res) => {
    const { email } = req.params

    try {
        const calendarRef = db.collection("events")
        const response = await calendarRef.where("email", "==", email).get()
        let responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr.sort())

    } catch (error) {
        res.send(error)
    }
})

module.exports = router


const users = [
    { name: 'david1', email: 'davidemail1@gmail.com' },
    { name: 'david2', email: 'davidemail2@gmail.com' },
    { name: 'david3', email: 'davidemail3@gmail.com' },
    { name: 'david4', email: 'davidemail4@gmail.com' },
    { name: 'david5', email: 'davidemail5@gmail.com' },
]

const quantity = 20
const PORT = process.env.PORT || 4000

let userTracker = 0

const callAndStorageEvents = () => {
    
    (userTracker === 5) && (userTracker = 0)
    console.log(`Sending user ${users[userTracker].name} for calendar events ramdom generation and storage into firestore cloud`)

    fetch(`http://localhost:${PORT}/events?user=${users[userTracker].name}&email=${users[userTracker].email}&quantity=${quantity}`, {
        method: 'post'
    })
        .then(response => console.log(response.statusText))
        .catch(error => console.log(
            'Error fetching data', error))

    //Increment user tracker
    userTracker++
}

callAndStorageEvents()


//Every 20 minutes
setInterval(() => {
    callAndStorageEvents()
}, 1200000)
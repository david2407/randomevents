const fillRandomArray = (quantity) => {
    const arr = [];
    while (arr.length < quantity) {
        var r = Math.floor(Math.random() * 1000) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr
}

const arrToEventsObject = (arr, user, email) => {
    const object = arr.map(element =>
    ({
        id: element,
        user: user,
        email: email,
        date: Date.now()
    })
    )
    return object
}

const PORT = process.env.PORT || 4000
const url = `http://localhost:${PORT}`

const getEvents = () => {
    return fetch(`${url}/getAll`)
        .then(res => res.json())
        .then(res => [...res])
        .catch(error => error)
}

const getEventsByEmail = (email) => {
    return fetch(`${url}/getByEmail/${email}`)
        .then(res => res.json())
        .then(res => [...res])
        .catch(error => error)
}

module.exports = { fillRandomArray, arrToEventsObject, getEvents, getEventsByEmail }

const express = require('express')
const cors = require('cors')
const app = express()
let persons = [
    {
        id: '1',
        name: 'Sam',
        age: '26',
        hobbies: [],
    },
] //This is your in memory database

app.use(express.json())
app.use(cors())

app.set('db', persons)

//TODO: Implement crud of person

app.get('/person', (req, res) => {
    // console.log('get all persons')
    return res.status(200).json({ persons })
})
app.get('/person/:id', (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({ message: 'Id is required' })
    }
    const person = persons.find((person) => person.id === id)
    if (!person) {
        return res.status(404).json({ message: 'Person not found' })
    }
    return res.status(200).json({ person })
})

app.post('/person', (req, res) => {
    const person = req.body
    // console.log('person', person)
    if (!person.name || !person.age) {
        return res.status(400).json({ message: 'Name and age are required' })
    }
    person.id = persons.length
        ? String(Number(persons[persons.length - 1].id) + 1)
        : '1'
    person.hobbies = person.hobbies ? person.hobbies : []
    persons.push(person)
    return res.status(201).json({ person })
})

app.put('/person/:id', (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({ message: 'Id is required' })
    }
    const person = persons.find((person) => person.id === id)
    if (!person) {
        // return res.status(404).send('Person not found')
        return res.status(404).json({ message: 'Person not found' })
    }
    const updatedPerson = req.body
    if (updatedPerson.name) {
        person.name = updatedPerson.name
    }
    if (updatedPerson.age) {
        person.age = updatedPerson.age
    }
    if (updatedPerson.hobbies) {
        person.hobbies = updatedPerson.hobbies
    }
    return res.status(200).json({ person })
})

app.delete('/person/:id', (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({ message: 'Id is required' })
    }
    const personIndex = persons.findIndex((person) => person.id === id)
    if (personIndex === -1) {
        return res.status(404).json({ message: 'Person not found' })
    }
    persons.splice(personIndex, 1)
    return res.status(204).send()
})

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' })
})

if (require.main === module) {
    app.listen(3000)
    console.log('server is running on port 3000')
}
module.exports = app

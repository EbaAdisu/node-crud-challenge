let persons = require('../db/db')

const getPersons = (req, res) => {
    return res.status(200).json(persons)
}

const getPersonById = (req, res) => {
    const id = req.params.personId
    if (!id) {
        return res.status(400).json({ message: 'Id is required' })
    }
    const person = persons.find((person) => person.id === id)
    if (!person) {
        return res.status(404).json({ message: 'Person not found' })
    }
    return res.status(200).json(person)
}

const addPerson = (req, res) => {
    const person = req.body
    // console.log('person', person)
    if (
        person.name === undefined ||
        person.age === undefined ||
        person.hobbies === undefined
    ) {
        return res.status(400).json({ message: 'Name and age are required' })
    }
    if (isNaN(person.age)) {
        return res.status(400).json({ message: 'Age should be a number' })
    }
    if (!Array.isArray(person.hobbies)) {
        return res.status(400).json({ message: 'Hobbies should be an array' })
    }

    if (!person.hobbies.every((hobby) => typeof hobby === 'string')) {
        return res
            .status(400)
            .json({ message: 'Each hobby should be a string' })
    }
    person.id = persons.length
        ? String(Number(persons[persons.length - 1].id) + 1)
        : '1'
    person.hobbies = person.hobbies
    persons.push(person)
    return res.status(200).json(person)
}
const updatePerson = (req, res) => {
    const id = req.params.personId
    if (!id) {
        return res.status(400).json({ message: 'Id is required' })
    }
    const person = persons.find((person) => person.id === id)
    if (!person) {
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
    return res.status(200).json(person)
}
const deletePerson = (req, res) => {
    const id = req.params.personId
    if (!id) {
        return res.status(400).json({ message: 'Id is required' })
    }
    const personIndex = persons.findIndex((person) => person.id === id)
    if (personIndex === -1) {
        return res.status(404).json({ message: 'Person not found' })
    }
    persons.splice(personIndex, 1)
    return res.status(204).send()
}

module.exports = {
    getPersons,
    getPersonById,
    addPerson,
    updatePerson,
    deletePerson,
}

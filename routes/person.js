const express = require('express')
const router = express.Router()

const {
    getPersons,
    getPersonById,
    addPerson,
    updatePerson,
    deletePerson,
} = require('../controllers/person')

router.get('/', getPersons).post('/', addPerson)
router
    .get('/:personId', getPersonById)
    .put('/:personId', updatePerson)
    .delete('/:personId', deletePerson)

module.exports = router

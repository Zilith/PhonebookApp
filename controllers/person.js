const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

personRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({
          error: `the person with the id of ${req.params.id} does not exist`,
        })
      }
    })
    .catch((error) => next(error))
})

personRouter.post('/', (req, res, next) => {
  const body = req.body

  Person.find({ name: body.name })
    .then((result) => {
      if (result.length) {
        return res.status(400).json({
          error: `the name ${body.name} is already in the phonebook`,
        })
      } else {
        const person = new Person({
          name: body.name,
          phone: body.phone,
        })

        person
          .save()
          .then((savedPerson) => {
            res.json(savedPerson)
          })
          .catch((error) => next(error))
      }
    })
    .catch((error) => next(error))
})

personRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

personRouter.put('/:id', (req, res, next) => {
  const body = req.params

  const person = {
    name: body.name,
    phone: body.phone,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).send({ error: 'unknown id' })
      }
    })
    .catch((error) => next(error))
})

module.exports = personRouter

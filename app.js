const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')
const express = require('express')
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('data', function (req) {
  return JSON.stringify(req.body)
})
morgan.token('origin', (req) => req.rawHeaders[1] || 'no-origin')
app.use(morgan(':method :url :response-time :data :origin'))

const reqDate = () => {
  return new Date()
}

app.get('/', (req, res) => {
  res.status(200).json({
    res: 'OK',
  })
})

app.get('/info', (req, res) => {
  const time = reqDate()
  // console.log(time)
  Person.countDocuments({}).then((count) => {
    res.send(`<p>The phonebook has info for ${count} people </p> 
      <p>${time}</p>`)
  })
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
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

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  Person.find({ name: body.name })
    .then((result) => {
      console.log('existe?', Boolean(result.length))
      if (result.length) {
        console.log('enter if')
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

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

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

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, _next) => {
  console.log('Error name:', error.name)
  console.log('Error message:', error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
}

app.use(errorHandler)

module.exports = {
  app,
}

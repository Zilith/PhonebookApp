const config = require('./utils/config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const personRouter = require('./controllers/person.js')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.morganMiddleware)

app.use('/api/persons', personRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// const reqDate = () => {
//   return new Date()
// }

// app.get('/', (req, res) => {
//   res.status(200).json({
//     res: 'OK',
//   })
// })

// app.get('/info', (req, res) => {
//   const time = reqDate()
//   // console.log(time)
//   Person.countDocuments({}).then((count) => {
//     res.send(`<p>The phonebook has info for ${count} people </p>
//       <p>${time}</p>`)
//   })
// })

module.exports = app
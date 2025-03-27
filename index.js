const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const app = require('./app')


app.listen(config.PORT, () => {
  logger.info(`Server running on http://localhost:${config.PORT}`)
})

const express = require('express')
const cors = require('cors')
const { ObjectId } = require('mongodb')
const app = express()
const bodyParser = require('body-parser');

const budgetsRouter = require('./routers/budgets-router');
const entriesRouter = require('./routers/entries-router');
const itemsRouter = require('./routers/items-router');
const typesRouter = require('./routers/types-router');

const port = 2000


const errorLogger = (err, req, res) => {
  res.status(err.status).json({ ok: false, message: err.message });
}


module.exports = ({ database }) => {
  app.locals = {
    database
  }
  app.use(cors())
  app.use(bodyParser())

  app.use('/budgets', budgetsRouter)
  app.use('/entries', entriesRouter)
  app.use('/items', itemsRouter)
  app.use('/types', typesRouter)

  app.use(errorLogger)


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

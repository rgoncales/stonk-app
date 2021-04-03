import express from 'express'
import routes from './routes'

const app = express()
app.set('json spaces', 2)
const port = 3000
routes(app)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(err.code || 500).send({
    message: err.message,
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

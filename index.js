import express from 'express'
import mongoose from 'mongoose'
import { dbURI, port } from './config/environment.js'
import router from './config/router.js'
import path from 'path' // * <β- a new import from node

const app = express()

const __dirname = path.resolve() // * this line has been added, note this has a double underscore before it

const startServer = async () => {
  try {
    // connecting dbURI
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('π Database has connected successfully')

    app.use(express.static(`${__dirname}/client/build`)) // * <β This line has been added before the express json middleware, it will allow the app to respond to a request with contents of this directory βbuildβ, which will contain our React App code.

    // log request
    app.use((req, _res, next) => {
      console.log(`πΆπ± Incoming request: METHOD: ${req.method}, URL: ${req.url}`)
      next()
    })

    // convert into json
    app.use(express.json())

    // add router
    app.use('/api', router)

    app.use('/*', (_, res) => res.sendFile(`${__dirname}/client/build/index.html`)) // * <β This additional route handler has been added between the router and error handler middleware, it means that any incoming request that does not match a route in router should respond back with our frontend.

    // event listener
    app.listen(port, () => console.log(`πΆπ± Express is up and running on ${port}`))

  } catch (err) {
    console.log(err)
    console.log('S.O.S π')
  }
}

startServer()



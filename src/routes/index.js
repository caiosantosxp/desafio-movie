const { Router } = require('express')

const usersRoutes = require('./users.routes')
const moveisRoutes = require('./movies.routes')
const tagsRoutes = require('./tags.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/moveis', moveisRoutes)
routes.use('/tags', tagsRoutes)

module.exports = routes;
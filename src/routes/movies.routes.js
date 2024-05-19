const { Router } = require('express')
const MoveisControllers = require('../controllers/moviesControllers')

const moveisRoutes = Router();

const moveisControllers = new MoveisControllers();

moveisRoutes.get('/', moveisControllers.index)
moveisRoutes.post('/:user_id', moveisControllers.create)
moveisRoutes.get('/:id', moveisControllers.show)
moveisRoutes.delete('/:id', moveisControllers.delete)

module.exports = moveisRoutes;
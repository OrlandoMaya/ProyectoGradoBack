const { Router } = require('express');
const { ubicacionGet,ubicacionesGet,ubicacionPost,ubicacionPut,ubicacionDelete } = require('../controllers/ubicacion.controller');
const router = Router();

router.get('/:id', [], ubicacionGet)

router.get('/', [], ubicacionesGet)

router.post('/', [], ubicacionPost)

router.put('/:id', [], ubicacionPut)

router.delete('/:id', [], ubicacionDelete)

module.exports = router;
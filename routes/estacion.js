const { Router } = require('express');
const { estacionGet,estacionesGet,estacionPost,estacionPut,estacionDelete } = require('../controllers/estacion.controller');
const router = Router();

router.get('/:id', [], estacionGet)

router.get('/', [], estacionesGet)

router.post('/', [], estacionPost)

router.put('/:id', [], estacionPut)

router.delete('/:id', [], estacionDelete)

module.exports = router;
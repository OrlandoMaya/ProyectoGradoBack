const { Router } = require('express');
const { estacionGet,estacionesGet,estacionPost,estacionPut,estacionDelete } = require('../controllers/estacion.controller');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

router.get('/:id', [

], estacionGet)

router.get('/', [
    
], estacionesGet)

router.post('/', [
    validateJWT,
], estacionPost)

router.put('/:id', [
    validateJWT,
], estacionPut)

router.delete('/:id', [
    validateJWT,
], estacionDelete)

module.exports = router;
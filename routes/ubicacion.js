const { Router } = require('express');
const { ubicacionGet,ubicacionesGet,ubicacionPost,ubicacionPut,ubicacionDelete } = require('../controllers/ubicacion.controller');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

router.get('/:id', [
    validateJWT,
], ubicacionGet)

router.get('/', [
    validateJWT,
], ubicacionesGet)

router.post('/', [
    validateJWT,
], ubicacionPost)

router.put('/:id', [
    validateJWT,
], ubicacionPut)

router.delete('/:id', [
    validateJWT,
], ubicacionDelete)

module.exports = router;
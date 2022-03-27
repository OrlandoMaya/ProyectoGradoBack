const { Router } = require('express');
const { mantenimientoGet,mantenimientosGet,mantenimientoPost,mantenimientoPut,mantenimientoDelete } = require('../controllers/mantenimiento.controller');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

router.get('/:id', [
    validateJWT,
], mantenimientoGet)

router.get('/', [
    validateJWT,
], mantenimientosGet)

router.post('/', [
    validateJWT,
], mantenimientoPost)

router.put('/:id', [
    validateJWT,
], mantenimientoPut)

router.delete('/:id', [
    validateJWT,
], mantenimientoDelete)

module.exports = router;
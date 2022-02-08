const { Router } = require('express');
const { mantenimientoGet,mantenimientosGet,mantenimientoPost,mantenimientoPut,mantenimientoDelete } = require('../controllers/mantenimiento.controller');
const router = Router();

router.get('/:id', [], mantenimientoGet)

router.get('/', [], mantenimientosGet)

router.post('/', [], mantenimientoPost)

router.put('/:id', [], mantenimientoPut)

router.delete('/:id', [], mantenimientoDelete)

module.exports = router;
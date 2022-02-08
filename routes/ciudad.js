const { Router } = require('express');
const { ciudadGet,ciudadesGet,ciudadPost,ciudadPut,ciudadDelete } = require('../controllers/ciudad.controller');
const router = Router();

router.get('/:id', [], ciudadGet)

router.get('/', [], ciudadesGet)

router.post('/', [], ciudadPost)

router.put('/:id', [], ciudadPut)

router.delete('/:id', [], ciudadDelete)

module.exports = router;
const { Router } = require('express');
const { departamentoGet,departamentosGet,departamentoPost,departamentoPut,departamentoDelete } = require('../controllers/departamento.controller');
const router = Router();

router.get('/:id', [], departamentoGet)

router.get('/', [], departamentosGet)

router.post('/', [], departamentoPost)

router.put('/:id', [], departamentoPut)

router.delete('/:id', [], departamentoDelete)

module.exports = router;
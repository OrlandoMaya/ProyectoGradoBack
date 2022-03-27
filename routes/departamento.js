const { Router } = require('express');
const { departamentoGet,departamentosGet,departamentoPost,departamentoPut,departamentoDelete } = require('../controllers/departamento.controller');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

router.get('/:id', [
    validateJWT,
], departamentoGet)

router.get('/', [
    validateJWT,
], departamentosGet)

router.post('/', [
    validateJWT,
], departamentoPost)

router.put('/:id', [
    validateJWT,
], departamentoPut)

router.delete('/:id', [
    validateJWT,
], departamentoDelete)

module.exports = router;
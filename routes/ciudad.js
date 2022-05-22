const { Router } = require('express');
const { ciudadGet,ciudadesGet,ciudadPost,ciudadPut,ciudadDelete } = require('../controllers/ciudad.controller');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

router.get('/:id', [
  
], ciudadGet)

router.get('/', [
    
], ciudadesGet)

router.post('/', [
    validateJWT,
], ciudadPost)

router.put('/:id', [
    validateJWT,
], ciudadPut)

router.delete('/:id', [
    validateJWT
], ciudadDelete)

module.exports = router;
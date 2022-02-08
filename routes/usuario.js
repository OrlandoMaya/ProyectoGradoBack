const { Router } = require('express');
const { usuarioGet, usuariosGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario.controller');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
// const { isRolValid, isEmailCreated } = require('../helpers/db-validators');
const router = Router();

router.get('/', [], usuariosGet)

router.get('/:id', [], usuarioGet)

router.post('/', [
    // check('name', 'El nombre es obligatorio').not().isEmpty(),
    // check('email', 'El correo es obligatorio').not().isEmpty(),
    // check('email', 'El correo no es valido').isEmail(),
    // check('password', 'La contraseña es obligatoria').not().isEmpty(),
    // check('email').custom(isEmailCreated),
    // check('rol').custom(isRolValid),
    // validateForm
], usuarioPost)

router.put('/',[],usuarioPut)

router.delete('/',[],usuarioDelete)



module.exports = router;
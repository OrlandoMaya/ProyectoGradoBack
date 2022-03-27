const { Router } = require('express');
const { usuarioGet, usuariosGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario.controller');
const {login}=require('../controllers/auth.controller')
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
const { validateJWT } = require('../middlewares/validateJWT');
const { isAdminRole } = require('../middlewares/validateRol');
// const { isRolValid, isEmailCreated } = require('../helpers/db-validators');
const router = Router();

router.get('/', [
    validateJWT
], usuariosGet)

router.get('/:id', [
    validateJWT
], usuarioGet)

router.post('/', [
    // check('name', 'El nombre es obligatorio').not().isEmpty(),
    // check('email', 'El correo es obligatorio').not().isEmpty(),
    // check('email', 'El correo no es valido').isEmail(),
    // check('password', 'La contraseña es obligatoria').not().isEmpty(),
    // check('email').custom(isEmailCreated),
    // check('rol').custom(isRolValid),
    // validateForm
    validateJWT,
    // isAdminRole
], usuarioPost)

router.put('/:id',[
    validateJWT
],usuarioPut)

router.delete('/:id',[
    validateJWT,
    // isAdminRole
],usuarioDelete)

router.post('/login',[],login)

//Un mensaje de prueba el mono es una putita xd

module.exports = router;
const { Router } = require('express');
const { usersPost, usersGet, userGet } = require('../controllers/users.controller');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
const { isRolValid, isEmailCreated } = require('../helpers/db-validators');
const router = Router();

router.get('/', [], usersGet)

router.get('/:id', [], userGet)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email').custom(isEmailCreated),
    check('rol').custom(isRolValid),
    validateForm
], usersPost)

module.exports = router;
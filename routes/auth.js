const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { isEmailCreated } = require('../helpers/db-validators');
const { validateForm } = require('../middlewares/validateField');

const router = Router();

router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateForm
], login);

module.exports = router;
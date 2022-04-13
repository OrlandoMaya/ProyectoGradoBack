const { Router } = require('express');
const { getInfoInConsole, getRecursos } = require('../controllers/webhook.controller');
const {login}=require('../controllers/auth.controller')
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
const { validateJWT } = require('../middlewares/validateJWT');
const { isAdminRole } = require('../middlewares/validateRol');
const router = Router();

router.post('/get-info', [
], getInfoInConsole)

router.get('/resource',[],getRecursos)

module.exports = router;
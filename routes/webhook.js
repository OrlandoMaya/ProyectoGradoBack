const { Router } = require('express');
const { saveInfo, getRecursos } = require('../controllers/webhook.controller');
const {login}=require('../controllers/auth.controller')
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
const { validateJWT } = require('../middlewares/validateJWT');
const { isAdminRole } = require('../middlewares/validateRol');
const router = Router();

router.post('/saver-webhook', [
], saveInfo)

router.get('/resource',[],getRecursos)

module.exports = router;
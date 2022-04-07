const { Router } = require('express');
const { getInfoInConsole } = require('../controllers/webhook.controller');
const {login}=require('../controllers/auth.controller')
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
const { validateJWT } = require('../middlewares/validateJWT');
const { isAdminRole } = require('../middlewares/validateRol');
// const { isRolValid, isEmailCreated } = require('../helpers/db-validators');
const router = Router();

router.post('/get-info', [
], getInfoInConsole)

module.exports = router;
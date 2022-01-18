const { Router } = require('express');
const { comboGet, combosGet } = require('../controllers/combo.controller');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
const { isRolValid, isEmailCreated } = require('../helpers/db-validators');
const router = Router();

router.get('/:id', [], comboGet)

router.get('/', [], combosGet)



module.exports = router;
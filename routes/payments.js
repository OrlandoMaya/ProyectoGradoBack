const { Router } = require('express');
const { paymentsGet, paymentGet, paymentPost } = require('../controllers/payment.controller');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
const { isRolValid, isEmailCreated } = require('../helpers/db-validators');
const router = Router();

router.get('/', [], paymentsGet)

router.get('/:id', [], paymentGet)

router.post('/', [], paymentPost)

module.exports = router;
const { Router } = require('express');
const { umbrellaGet, umbrellasGet, umbrellaPost, umbrellaPut, umbrellaDelete } = require('../controllers/umbrella.controller');
const { check } = require('express-validator');
const { validateForm } = require('../middlewares/validateField');
const { isRolValid, isEmailCreated } = require('../helpers/db-validators');
const router = Router();

router.get('/:id', [], umbrellaGet)

router.get('/', [], umbrellasGet)

router.post('/', [], umbrellaPost)

router.put('/:id', [], umbrellaPut)

router.delete('/:id', [], umbrellaDelete)

module.exports = router;
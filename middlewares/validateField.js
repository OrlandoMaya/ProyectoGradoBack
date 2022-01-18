const { validationResult } = require('express-validator');

const validateForm = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).send(errors);
    }

    next();
}

module.exports = {
    validateForm
}
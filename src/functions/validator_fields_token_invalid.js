const {check} = require('express-validator');

const validator_fields_token_invalid = [
    check('code').notEmpty().withMessage('*O token informado não é valido').bail(),
]
module.exports = validator_fields_token_invalid;
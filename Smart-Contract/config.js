const path = require('path');
const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, './.env.development') });

const envVarsSchema = Joi.object().keys({
    ISSUER_ADDRESS: Joi.string().required().description('Issuer address'),
    ISSUER_PRIVATE_KEY: Joi.string().required().description('Issuer private key'),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    ISSUER: envVars.ISSUER_ADDRESS,
    ISSUER_PK: envVars.ISSUER_PRIVATE_KEY
}

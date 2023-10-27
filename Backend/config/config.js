const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object().keys({
    PORT: Joi.number().default(3000),
    WEB3_PROVIDER_DEV: Joi.string().required().description('Network URL'),
    ISSUER_ADDRESS: Joi.string().required().description('Issuer address'),
    ISSUER_CONTRACT_ADDRESS: Joi.string().required().description('Issuer contract address'),
    CERTIFICATE_CONTRACT_ADDRESS: Joi.string().required().description('Certificate contract address'),
    VERIFIER_CONTRACT_ADDRESS: Joi.string().required().description('Verification contract address'),
    HOLDER_CONTRACT_ADDRESS: Joi.string().required().description('Holder contract address'),
})
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    port: envVars.PORT,
    // mongoose: {
    //     url: envVars.MONGODB_URL,
    //     options: {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     },
    // },
    web3Provider: envVars.WEB3_PROVIDER_DEV,
    issuerAddress: envVars.ISSUER_ADDRESS,
    issuerContractAddress: envVars.ISSUER_CONTRACT_ADDRESS,
    certificateContractAddress: envVars.CERTIFICATE_CONTRACT_ADDRESS,
    verifierContractAddress: envVars.VERIFIER_CONTRACT_ADDRESS,
    holderContractAddress: envVars.HOLDER_CONTRACT_ADDRESS,
};
const config = require("../config");

let issuer = artifacts.require("Issuer");
let verify = artifacts.require("VerifySignature");
let holder = artifacts.require("Holder");
let cert = artifacts.require("Certificates");

module.exports = async function (deployer) {
  await deployer.deploy(verify);
  await deployer.deploy(issuer, config.ISSUER);
  await deployer.deploy(holder, issuer.address);
  await deployer.deploy(cert, issuer.address, holder.address, verify.address);
};

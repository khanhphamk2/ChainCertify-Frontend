const config = require("../config.js");

let issuer = artifacts.require("Issuer.sol");
// let cert = artifacts.require("Certificates.sol");

module.exports = async function (deployer) {
  await deployer.deploy(issuer, config.ISSUER);
  // await deployer.deploy(holder, issuer.address);
  // await deployer.deploy(cert, issuer.address, holder.address);
};

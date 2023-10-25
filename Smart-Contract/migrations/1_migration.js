let issuer = artifacts.require("Issuer");
let verify = artifacts.require("VerifySignature");
let holder = artifacts.require("Holder");
let cert = artifacts.require("Certificates");

module.exports = function (deployer) {
  deployer.deploy(verify);
  deployer.deploy(issuer).then(function () {
    return deployer.deploy(holder, issuer.address).then(function () {
      return deployer.deploy(cert, issuer.address, holder.address, verify.address);
    });
  })
};
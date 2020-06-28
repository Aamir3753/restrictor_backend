const fs = require("fs");
const privateKey = fs.readFileSync("./private.key", "utf8");
const publicKey = fs.readFileSync("./public.key", "utf8");
const regularPublicKey = fs.readFileSync("./regularPublic.key");
const regularPrivateKey = fs.readFileSync("./regularPrivate.key");

module.exports = {
  privateKey,
  publicKey,
  regularPrivateKey,
  regularPublicKey,
};

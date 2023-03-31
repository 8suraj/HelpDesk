const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
function UserData(token) {
  jwtToken = token.split(" ")[1];
  return jwt_decode(jwtToken);
}
function jwtGen(data) {
  return jwt.sign(data, process.env.SECRET, { expiresIn: "15min" });
}
function jwtVerify(token) {
  jwtToken = token.split(" ")[1];
  let status;
  jwt.verify(jwtToken, process.env.SECRET, (err) => {
    if (err) {
      status = false;
    }
    status = true;
  });
  return status;
}
module.exports = { jwtGen, jwtVerify, UserData };

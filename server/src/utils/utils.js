const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
function UserData(token) {
  jwtToken = token.split(" ")[1];
  const decoded = jwt_decode(jwtToken)
  if (!decoded.message) return decoded;
  return null;
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

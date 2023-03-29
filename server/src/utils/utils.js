const jwt = require("jsonwebtoken");

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
module.exports = { jwtGen, jwtVerify };

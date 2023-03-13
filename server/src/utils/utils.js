const jwt = require("jsonwebtoken");

function jwtGen(data) {
    return jwt.sign(data, process.env.SECRET,{expiresIn:'15min'});
}
function jwtVerify(token){
    let status;
    jwt.verify(token,process.env.SECRET,(err)=>{
        if(err){
            status = false;
            return
        }
        status = true;
        return 
    })
    return status
}
module.exports={jwtGen,jwtVerify}
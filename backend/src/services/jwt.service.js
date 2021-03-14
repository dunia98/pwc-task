const jwt = require('jsonwebtoken');

async function sing(user){
    let token = await jwt.sign({user}, 'Dun!a@123');

    return token;
}

function verify(token, res, roles, callback){
    jwt.verify(token, 'Dun!a@123', function(err, userData){
        let checkRoles = true;
        if(roles && roles.lenght > 0){
            checkRoles = roles.some(item => userData.user.roles.includes(item));
        }
        if(err || !checkRoles) {
            res.status(403).send('you need token');
        } else{
            callback(userData)
        }
    });
}

function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];

    if(typeof authHeader !== 'undefined'){
        const bearer =  authHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;
        next();
    }else{
        res.status(403).send('you need token');
    }
    
}

module.exports = {sing, verify, verifyToken};
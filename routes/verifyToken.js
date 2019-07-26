const jwt = require('jsonwebtoken');

// Function to check if a user has the correct token
module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send('Access Denied');
    }

    try{

        // verify the token in user header, THIS RETURNS THE ID of the token which we set to the user_id
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
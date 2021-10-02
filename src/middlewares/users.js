const jwt = require('jsonwebtoken');

const isValid = (req,res,next)=>{
    const { token } = req.headers;
    
    if(!token){
        return res.json({error: 'No tienes acceso'});
    }
    const data = jwt.verify(token, 'loquesea');

    if(!data){
        return res.json({error: 'No tienes acceso'});
    }
    next();
}

const isAdmin = (req,res,next)=>{
    const { token } = req.headers;
    const data = jwt.verify(token, 'loquesea');
    if(data.user.admin === false){
        return res.status(409).json({error: 'No tienes acceso'});
    }
    next();
}

module.exports={
    isValid,
    isAdmin,
}
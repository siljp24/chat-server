const models = require('../models');
const helpers = require('../helpers')
const jwt = require('jsonwebtoken');

const signUp = async (req,res)=>{
    try{
        const { email, password1, password2 } = req.body;
        if(!email || !password1 || !password2 || password1 !== password2){
            return res.status(409).json({error: 'Email o contraseñas incorrectas'})
        }
        const exists = await models.user.findOne({email});
        if(exists){
            return res.status(409).json({error: 'Usuario ya registrado'});
        }
        const hash = await helpers.bcrypt.encrypt(password1);
        const user = new models.user({email, password: hash});
        await user.save();
        return res.status(201).json({ user });
    }catch(_){
        return res.status(409).json({error: 'Hubo un error en el request'});
    }
    
    
}

const signIn = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await models.user.findOne({email})
        if(!user){
            return res.status(409).json({ error: 'Usuario no registrado'});
        }
        const isValid = await helpers.bcrypt.compare(password, user.password)
        if(!isValid){
            return res.status(409).json({error: 'Contraseña incorrecta'})
        }else{
            const token = jwt.sign({ user }, 'loquesea');
            return res.status(201).json({token, userId: user._id});
        }
    }catch(err){
        return res.status(401).json({error: 'Hubo un error'})
    }
    
}

const listUsers = async (req, res)=>{
    try{
        const data = jwt.verify(req.headers.token, 'loquesea');
        if(!data){
            return res.status(409).json({error: 'no se encontró la sesión'})
        }
        const users = await models.user.find({_id: {$ne: data.user._id} });
        if(users.length === 0){
            return res.status(409).json({error: 'No se encontraron usuarios'});
        }
        return res.status(201).json({ users });
    }catch(err){
        console.log(err);
        return res.status(404).json({ error: 'Usuarios no encontrados'});
    }
    
}

module.exports = {
    signIn,
    signUp,
    listUsers
}
const { model } = require('mongoose');
const models = require('../models');

const create = async (req,res)=>{
    try{
        const { user1Id, user2Id, text, userOwnerId } = req.body;
        
        if(!user1Id || !user2Id || !text || !userOwnerId){
            return res.status(409).json({ error: 'campos no completados'});
        }

        const userOne = await models.user.findById( user1Id );
        if(!userOne){
            return res.status(409).json({ error: 'Usuario no encontrado'});
        }
    
        const userTwo = await models.user.findById( user2Id );
        if(!userTwo){
            return res.status(409).json({ error: 'Usuario no encontrado'});
        }
     
        const userOwner = await models.user.findById( userOwnerId );
        if(!userOwner){
            return res.status(409).json({ error: 'Usuario no encontrado' });
        }
       
        const messages = await models.message.find({
            user1: userTwo,
            user2:userOne, 
        })

        let message = null;
        if(messages.length === 0){
            message = await models.message.create({
                user1: userOne,
                user2: userTwo,
                text,
                userOwner,

        })
        }else{
            message = await models.message.create({
                user1: userTwo,
                user2:userOne,
                text,
                userOwner,
            })
        } 
        return res.status(201).json({ message }); 
    }catch(err){
        console.log(err);
        return res.status(409).json({ err })
    }
    
}


const chat = async (req,res)=>{
    try{
        const { userOneId, userTwoId } = req.body;
        // console.log({userOneId, userTwoId})
        const user1 = await models.user.findById(userOneId);
        if(!user1){
            return res.status(409).json({ error: 'No se encontró usuario'});
        }
        const user2 = await models.user.findById(userTwoId);
        if(!user2){
            return res.status(409).json({error: 'No se encontró usuario'});
        }

        let result = [];
        const users1 = await models.message.find({
            user1,
            user2 
        })
        if(users1.length === 0){
            const users2 = await models.message.find({
                user1: user2,
                user2: user1,
            })
            result = users2;
        }else{
            result = users1;
        }
        return res.status(201).json({ result });
    }catch(err){
        console.log(err);
        return res.status(409).json({ error: err});
    }
}
module.exports = {
    create,
    chat,
}
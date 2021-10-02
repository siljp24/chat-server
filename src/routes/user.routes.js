const { Router } = require('express');
const controllers = require('../controllers');
const middleware = require('../middlewares');

const router = Router();

router.post('/sign-up', controllers.user.signUp);

router.post('/sign-in', controllers.user.signIn);

router.get('/listUsers',middleware.users.isValid, controllers.user.listUsers);

router.delete('/delete', middleware.users.isAdmin ,controllers.user.removeUser);

module.exports= router;



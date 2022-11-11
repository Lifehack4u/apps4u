const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();



router.get('/login', ( p_req, p_res)=>{
    p_res.json({"route":"login"});
});

router.get('/register', ( p_req, p_res)=>{
    p_res.json({"route":"register"});
});

router.get('/reset-password', ( p_req, p_res)=>{
    p_res.json({"route":"reset-password"});
});


router.get('/verify-token', ( p_req, p_res)=>{
    p_res.json({"route":"verify-token"});
});




/// Using the router;
app.use('/auth', router );
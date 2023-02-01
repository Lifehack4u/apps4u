const app = require('../core/app');
const router = require('express').Router();


/// Use a middleware
// router.use((req, res, next) => {
//     next()
// })


router.post('/', ( p_req, p_res)=>{

    p_res.json({"message": "Route is empty"});
});


router.post('/retirve', ( p_req, p_res)=>{
    p_res.json({"route": "test1 "});
});


router.post('/update', ( p_req, p_res)=>{
    p_res.json({"route": "test1 "});
});


router.post('/destroy', ( p_req, p_res)=>{
    p_res.json({"route": "test1 "});
});


router.post('/create', ( p_req, p_res)=>{
    p_res.json({"route": "test1 "});
});




/// The name of your main route;
app.use('/database', router );
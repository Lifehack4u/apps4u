const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();



router.use((req, res, next) => {
    next()
})

router.get('/', ( p_req, p_res)=>{
   
    p_res.json({"route": "test "});
});

router.get('/test1', ( p_req, p_res)=>{
   
    p_res.json({"route": "test1 "});
});




/// Using the router;
app.use('/test', router );
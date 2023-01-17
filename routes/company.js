const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();


/// Use a middleware
// router.use((req, res, next) => {
//     next()
// })


router.get('/', ( p_req, p_res)=>{
    
    view( p_res, 'company', 'company', 'default');
});

router.get('/users', ( p_req, p_res)=>{
   
    view( p_res, 'company/users', 'Users', 'default');
});

router.get('/json', ( p_req, p_res)=>{
   
    p_res.json({"the json": "get" });
});

router.post('/post-json', ( p_req, p_res)=>{
   
    p_res.json({"the json": "post" });
});


router.get('/user/:username/:lastname', ( p_req, p_res)=>{

    view( p_res, 'company/user', 'User', 'default', 
    {"username": p_req.params.username, "lastname": p_req.params.lastname });

});

router.get('/settings', ( p_req, p_res)=>{
   
    view( p_res, 'company/settings', 'settings', 'default');
});

router.get('/getcompany/:userid', ( p_req, p_res)=>{
    p_res.json({"userid": p_req.params.userid });
});



router.post('/setcompany/:userid', ( p_req, p_res)=>{

    console.log(' req : ', p_req.body);
    p_res.json({"userid": p_req.params.userid, "body": p_req.body });
});






/// The name of your main route;
app.use('/company', router );
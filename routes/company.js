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


router.get('/user/:username', ( p_req, p_res)=>{

    view( p_res, 'company/user', 'User', 'default', {"username": p_req.params.username });

});

router.get('/settings', ( p_req, p_res)=>{
   
    view( p_res, 'company/settings', 'settings', 'default');
});


router.post('/setcompany/:userid', ( p_req, p_res)=>{

    console.log(' req : ', p_req.body);
    p_res.json({"userid": p_req.params.userid, "body": p_req.body });
});

router.get('/getcompany/:userid', ( p_req, p_res)=>{
    p_res.json({"userid": p_req.params.userid });
});




/// The name of your main route;
app.use('/company', router );
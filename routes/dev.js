const app = require('../core/app');
const { view } = require('../core/view');
const { registerRoutes } = require('../core/apico');
const router = require('express').Router();
const path = require('path');



router.get('/', ( p_req, p_res)=>{
    p_res.json({"route":"dev"});
});


router.get('/app', ( p_req, p_res)=>{
    console.log(" app routes : ", app.routes );
    p_res.json({"route":"app"});
});

router.get('/registerRoutes', ( p_req, p_res)=>{
    registerRoutes();
    p_res.json({"route":"registerRoutes"});
});
router.get('/test', ( p_req, p_res)=>{
    
    p_res.json({"route":"test"});
});

router.get('/clearcache', ( p_req, p_res)=>{
    Object.keys( require.cache ).forEach(( _el )=>{
        if( /(.*)\\apps4u\\routes\\(.*)js/.test(_el) ) {
            console.log(" el : ", require.cache[ _el ] );
        }
    })
    p_res.json({"route":"test"});
});




/// Using the router;
app.use('/dev', router );

const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();


/// Use a middleware
// router.use((req, res, next) => {
//     next()
// })


/// This will your main route - www.example.com/test/
router.get('/', ( p_req, p_res)=>{
    //p_res.json({"route": "meehack"});
    view( p_res, 'meehack', 'Welcome', 'default', {});
});

router.get('/account', ( p_req, p_res)=>{
   // p_res.json({"route": "account"});
   view( p_res, 'meehack/account', 'Welcome', 'default', {});
});

/* also known as --
router.get('/route1', function(p_req---from browser, p_res---to browser){
    p_res.json({"route": "route1"});
});


///  www.example.com/test/test1
router.get('/test1', ( p_req, p_res)=>{
   
    p_res.json({"route": "test1 "});
});


/// A post request - www.example.com/test/name
router.post('/name', ( p_req, p_res)=>{
   
    p_res.json({"name": "Moha"});
}); */


/// The name of your main route;
app.use('/meehack', router );
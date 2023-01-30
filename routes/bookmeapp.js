const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();


/// Use a middleware
// router.use((req, res, next) => {
//     next()
// })


/// This will your main route - www.example.com/test/
router.get('/', ( p_req, p_res)=>{
  // p_res.json({"route": "bookmeapp"});
   view( p_res, 'bookmeapp', 'The bookmeapp', 'default', {});
});

router.get('/settings', ( p_req, p_res)=>{
     //p_res.json({"route": "bookmeapp"});
     //console.log("Hello");
     view( p_res, 'bookmeapp/settings', 'settings', 'default', {});
     
  });

router.get('/registration', ( p_req, p_res)=>{
    //p_res.json({"route": "bookmeapp"});
    //console.log("Hello");
    view( p_res, 'bookmeapp/registration', 'registration', 'default', {});
    
 });
  



/// The name of your main route;
app.use('/bookmeapp', router );
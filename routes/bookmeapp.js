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

router.get('/settings', function( p_req, p_res){
    // p_res.json({"route": "bookmeapp"});
    view( p_res, 'bookmeapp/settings', 'The bookmeapp', 'default', {});
  });
  



/// The name of your main route;
app.use('/bookmeapp', router );
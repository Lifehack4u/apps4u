const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();


/// This will your main route - www.example.com/test/
router.get('/', ( p_req, p_res)=>{
    //p_res.json({"route": "school "});
    view( p_res, 'school', 'The schhol', 'default', {});
});


router.get('/settings', function( p_req, p_res){
// p_res.json({"route": "settings "});
view( p_res, 'school/settings', 'The schhol', 'default', {});
});




/// The name of your main route;
app.use('/school', router );
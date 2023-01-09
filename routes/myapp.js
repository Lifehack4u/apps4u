const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();


/// Use a middleware
// router.use((req, res, next) => {
//     next()
// })


/// This will your main route - www.example.com/myapp
router.get('/', ( p_req, p_res)=>{
    
    view( p_res, 'main', 'main', 'default', {});
});


///  www.example.com/myapp/test1
router.get('/moha', ( p_req, p_res)=>{
   
    p_res.json({"route": "test1 "});
});


/// A post request - www.example.com/myapp/name
router.post('/name', ( p_req, p_res)=>{
   
    p_res.json({"name": "Moha"});
});




/// The name of your main route;
app.use('/myapp', router );
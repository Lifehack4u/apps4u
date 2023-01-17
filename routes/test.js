const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();


/// Use a middleware
// router.use((req, res, next) => {
//     next()
// })


/// This will your main route - www.example.com/test/
router.get('/', ( p_req, p_res)=>{
    
    view( p_res, 'test', 'test', 'default');
});


///  www.example.com/test/test1
router.get('/test1', ( p_req, p_res)=>{
   
    p_res.json({"route": "test1 "});
});


/// A post request - www.example.com/test/name
router.post('/name', ( p_req, p_res)=>{
   
    p_res.json({"name": "Moha"});
});




/// The name of your main route;
app.use('/test', router );

















let user = {
    "name":"MAr",
    "age": 33,
    "hoob": "books"
}







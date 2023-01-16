const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();


/// Use a middleware
// router.use((req, res, next) => {
//     next()
// })


/// This will your main route - www.example.com/test/
router.get('/', (p_req, p_res) => {

    view(p_res, 'volunteer', 'VProject', 'default');
});

router.get('/registration', (p_req, p_res) => {

    view(p_res, 'volunteer/registration', 'VProject', 'default');
});

///  www.example.com/test/test1
router.get('/form1', (p_req, p_res) => {

    p_res.json({ "route": "test1 " });
});


/// A post request - www.example.com/test/name
//router.post('/registration', (p_req, p_res) => {

///p_res.json({
//"name": "Olga",
//"surname": " Horbunova"
//});
//});




/// The name of your main route;
app.use('/volunteer', router);
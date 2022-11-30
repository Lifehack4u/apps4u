const app = require('../core/app');
const { view } = require('../core/view');

const router = require('express').Router();

let counter = 0;

function setCounterToZero()
{
    counter = 0;
}
router.use((req, res, next) => {
    next()
})

router.get('/', ( p_req, p_res)=>{
    counter++;
    view( p_res, 'main', 'main', 'default', {'counter': counter} );
});

router.get('/aboute', ( p_req, p_res)=>{
    counter++;
    setCounterToZero();
    view( p_res, 'aboute', 'aboute', 'default', {'counter': counter} );
});




/// Using the router;
app.use('/', router );
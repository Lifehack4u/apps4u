const app = require('../core/app');
const { view } = require('../core/view');

const Database = require('../core/database/database');

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
    view( p_res, 'aboute', 'aboute', 'default', {'counter': counter} );
});

router.get('/cities', ( p_req, p_res)=>{

    let mysql = new Database({ driver: 'mysql', host:'localhost', db_name:'world', user: 'testuser', password: 'testpass1234' });

    mysql.table('city').columns(' ID , Name ').where(' ID = ?',[1]).retriev().then(( res )=>{
        p_res.json({"result": res.result  });
    })
    .catch(( err )=>{
        console.error(' err : ', err );
        p_res.json({"route": "err "});
    });
    
});




/// Using the router;
app.use('/', router );
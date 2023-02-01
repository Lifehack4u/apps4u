const app = require('../core/app');
const { view } = require('../core/view');

const sql = require('mssql/msnodesqlv8')

var config = {
    server: "LAPTOP-6906J09J\\SQLEXPRESS",
    user: "test@test.test",
    password: "testpass123456",
    database: 'testDB',
    driver: 'msnodesqlv8',
    options:{
        trustedConnection: true
    }
  };


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
   
    sql.connect(config)
    .then( pool =>{

        return pool.request().query( `select * from companies` )
    } )
    .then( res =>{
        console.log(' sql res :  ', res.recordset );
        p_res.json({ "result": res.recordset  });
    })
    .catch( err=>{
        console.log(' err  : ', err );
        p_res.json({ "err": err  });
    } )

    
});




/// Using the router;
app.use('/', router );
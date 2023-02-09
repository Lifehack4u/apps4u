const app = require('../core/app');
const { view } = require('../core/view');

const sql = require('mssql/msnodesqlv8')

var config = {
    server: "LAPTOP-6906J09J\\SQLEXPRESS",
    user: "newtest@test.test",
    password: "test123456",
    database: 'testDB',
    driver: 'msnodesqlv8',
    options:{
        trustedConnection: true
    }
  };


const router = require('express').Router();


router.use((req, res, next) => {
    next()
})

router.get('/', ( p_req, p_res)=>{
    view( p_res, 'main', 'main', 'default', {'counter': 2} );
});

router.get('/aboute', ( p_req, p_res)=>{
    view( p_res, 'aboute', 'aboute', 'default', {'counter': 2} );
});

router.get('/companies', ( p_req, p_res)=>{
   
    sql.connect({
        server: "LAPTOP-6906J09J\\SQLEXPRESS",
        user: "newtest@test.test",
        password: "test123456",
        database: 'testDB',
        driver: 'msnodesqlv8',
        options:{
            trustedConnection: true
        }
      })
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

router.post('/login', function( p_req, p_res ){
    sql.connect({
        server: "LAPTOP-6906J09J\\SQLEXPRESS",
        user: "newtest@test.test",
        password: "test123456",
        database: 'testDB',
        driver: 'msnodesqlv8',
        options:{
            trustedConnection: true
        }
      })
      .then( pool =>{
        /// Check if user exists
        console.log(' p_req.body :  ', p_req.body );
        return pool.request().query( `select * 
                                                from Users
                                                where email = '${ p_req.body.user }'
                                                and password= '${ p_req.body.key }' ` )
      })
      .then( res =>{
        console.log(' user exists or does not.');
        if( res.recordset.length === 0 ){
            p_res.json({ "res": [], 'code': 0  });
        } else {
            p_res.json({ "res": res.recordset, 'code': 1  });
        }
        
      })
      .catch( err=>{
        console.log(' err  : ', err );
        p_res.json({ "err": err  });
    } )
})




/// Using the router;
app.use('/', router );
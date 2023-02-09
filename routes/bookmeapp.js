const app = require('../core/app');
const { view } = require('../core/view');

const sql = require('mssql/msnodesqlv8')

var config = {
    server: "ELEV-1FT52E\\",//\\MSSQLSERVER",
    user: "newtest@test.test",
    password: "Test12345",
    database: 'bookmeappDB',
    driver: 'msnodesqlv8',
    options:{
        trustedConnection: true
    }
  };


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

 router.post('/login', ( p_req, p_res)=>{
   //p_res.json({"route": "bookmeapp"});
   //console.log("Hello");
   //console.log(p_req);

    
   sql.connect(config).then( pool=>{
      console.log('p_req.body: ', p_req.body);
      let myquery = `select * from Users where email = '${ p_req.body.name }' and password = '${ p_req.body.password }'`;
      console.log(myquery);
      return pool.request().query(myquery);     
         
         
         
        
   }).then (res =>{
         console.log('user exists or does not');
         //p_res.json({"res": res.recordset});


         if(res.recordset.length > 0){
            //p_res.json({})
            p_res.redirect('/bookmeapp/registration');  
            p_res.statusCode = '200';
         }
         else {
            console.log("im here");
            p_res.json({"msg":"Invalid Username or Password"});   
            p_res.statusCode = '403';         
         }

   }).catch(err => {
      console.log('err:', err);
      p_res.json({"err": err})
   })



////////////////////////////////////////////////////
 /* 
   if(p_req.body.name == "larissa" && p_req.body.password == "1234"){
      //p_res.json({"msg":"Welcome Back"});
      p_res.redirect('/bookmeapp/registration');  
      p_res.statusCode = '200';
      //view( p_res, 'bookmeapp/registration', 'registration', 'default', {});
      // redirect to another page here....
   }
   else{
      p_res.json({"msg":"Invalid Username or Password"});    
      p_res.statusCode = '403';     
   }
*/   
   
   
});
  



/// The name of your main route;
app.use('/bookmeapp', router );
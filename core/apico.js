const { exec } = require('child_process');
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

const fs = require("fs");
const path = require("path");
const { view } = require('./view');


let _allRoutes = {
  "post":[],
  "get":[],
  "all":[]
};

app.use(function(req, res, next) {
  //res.setHeader('Content-Security-Policy', "default-src 'none'; object-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline';img-src 'self' blob: data:; font-src 'self' https: data:;media-src 'self' blob:;connect-src http://localhost:3000 ; ");
  next();
});

function start()
{
    const port  = process.env.PORT || 3000;

    server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

    //exec(` start chrome --app=http://localhost:${port} `);
    })
}

function middleware()
{
    
}

function validateMiddlewares( p_middlewares, p_req, p_res )
{
  return true;
}

function allRoutes()
{
  return app.routes; //_allRoutes;
}
function pushRoute( p_route, controller_name, method_name, http_method )
{
  _allRoutes[ http_method ].push({
    "route": p_route,
    "controller": controller_name,
    "method": method_name
  });

}

function route(  route_path, p_method, p_fun, p_middlewares = [], p_this )
{
  // console.log( "p_this : ", p_this );
  // console.log("p_fun : ", p_fun );
  // app[ p_method ]( route_path, p_this[ p_fun ] );

  app[ p_method ]( route_path, ( p_req, p_res )=>{
    
    if ( validateMiddlewares( p_middlewares, p_req, p_res ) ) {
      //p_fun.apply( p_this, [ p_req, p_res ] );
      p_this[ p_fun ]( p_req, p_res )
    }else{
      // TODO handle error. Save into DB and redirect to an error page;
    }
  });
}

function registerMiddlewares()
{

}

function registerRoutes()
{
  let d = path.dirname( __dirname );
  
  let routes = path.join( d, "routes" );

  const routes_files = fs.readdirSync( routes );

  if( routes_files ) {
    routes_files.forEach( _f=>{
          console.log("_f : ", _f );
          require( `${routes}/${ _f.split('.')[0] }` )
      });
  }
  /**
   * Wildcard route
   */
  app.get('*', function( p_req, p_res ){
    p_res.status(404);
    view( p_res, 'notfound', 'Not found 404' );
  });

  app.post('*', function( p_req, p_res ){
    p_res.status(404);
    p_res.json({"message":"Route does not exist!"});
  });
}

module.exports = {
    start,
    middleware,
    registerMiddlewares,
    registerRoutes,
    route,
    pushRoute,
    allRoutes
}
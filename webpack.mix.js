const mix = require('laravel-mix');

let appName = process.env.npm_config_app_name;
let libName = process.env.npm_config_lib_name;
let allApps = process.env.npm_config_all_apps;

mix.webpackConfig({
  module:{
    rules:[
      {
        test:/\.html$/,
        loader:'html-loader'
      }
    ]
  }
})

if( libName ) {
  mix.js('frontend/source/lib'+libName+'/index.js', 'frontend/public/libs/'+libName)
  .sass('frontend/source/lib'+libName+'/index.scss', 'frontend/public/libs/'+libName );
}else{
  if( appName ){
      mix.js('frontend/source/apps/'+appName+'/js/index.js', 'frontend/public/apps/'+appName)
      .sass('frontend/source/apps/'+appName+'/index.scss', 'frontend/public/apps/'+appName );
  }else if( allApps ){

  }else{
      mix.js('frontend/source/apps/app.js', 'frontend/public/js')
      .sass('frontend/source/apps/app.scss', 'frontend/public/css' );
  }
}


const path = require('path');
const fs = require('fs');

class DataSource {
    constructor( p_app_name, p_ds_name )
    {
        this.appName = p_app_name;
        this.dsName = p_ds_name;
        this.dsFilePath = path.resolve( path.dirname( __dirname ) )+`/views/apps/${ this.appName }/ds/${ this.dsName }`;
        this.config = ( fs.existsSync( dsFilePath ) ) ? require( dsFilePath ) : null;
        this.err = null;
        if( !config ) this.err = {"message":"The config file is missing!"};

    }

    retrive()
    {

    }

    create()
    {

    }

    update()
    {

    }

    remove()
    {

    }
}

/** CRUD */
function retrive()
{

}

function create()
{

}

function update()
{

}

function remove()
{

}

function getAppDSConfig( p_app_name )
{
    let configs = [];
    let fp =  path.resolve( path.dirname( __dirname ) )+`/views/apps/${ p_app_name }/ds`; 
    let files = fs.readdirSync( fp );
    if( files ) {
        files.forEach(( _f )=>{
            let c = require( fp+'/'+_f );
            configs.push( c );
        })
    }

    return configs;
}

function createDatasource( p_app_name, p_options )
{

}


module.exports = DataSource;
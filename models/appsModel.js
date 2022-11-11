const path = require('path');
const fs = require('fs');

function getAllAps()
{
    let all_apps = new Map();
    let files = fs.readdirSync( `./frontend/source/apps` );
    if( files ) {
        files.forEach((_f)=>{
            let subPath = path.resolve( path.dirname( __dirname ) )+`/frontend/source/apps/${ _f }`;

            if( fs.lstatSync( subPath ).isDirectory() ) {
                all_apps.set( _f, { "ds":[], "config":{} } );

                let _files = ( fs.existsSync( subPath+'/ds' ) ) ? fs.readdirSync( subPath+'/ds' ) : null;
                if( _files ) {
                    _files.forEach((_ff)=>{
                        all_apps.get( _f ).ds.push( require( `${subPath}/ds/${ _ff }` ) );
                    });
                }

                if( fs.existsSync( subPath+'/config.json' ) ) {
                    all_apps.get( _f ).config = require( subPath+'/config.json' );
                }
            }
        })
    }
    return all_apps;
}

module.exports = {
    getAllAps
}


const path = require('path');
const fs = require('fs');


function getAppCss( p_app_name )
{
    let r = ``;
    let f = `./frontend/public/apps/${ p_app_name }/index.css`;

    if( fs.existsSync( f ) ){
        r = `<link rel="stylesheet" href="static/apps/${p_app_name}/index.css">`;
    }
    return r;
}

function getAppJs( p_app_name )
{
    let r = ``;
    let f = `./frontend/public/apps/${ p_app_name }/index.js`;

    if( fs.existsSync( f ) ){
        r = `<script type="text/javascript" src="/static/apps/${p_app_name}/index.js" ></script>`;
    }
    return r;
}

function initAppDs( p_app_name )
{
    let r = '';
    let dir = `./frontend/source/apps/${ p_app_name }/ds`;
    if( fs.existsSync( dir ) ) {
        let files = fs.readdirSync( dir );
        if( files ) {
            r += '<script>';
            files.forEach((_f)=>{
                let config = require(`../frontend/source/apps/${ p_app_name }/ds/${ _f }`);
                r += `window.container.createDS(${ JSON.stringify(config) });`;
            });

            r += '</script>';
        }
    }
    

    return r;
}

module.exports = {
    getAppCss, getAppJs, initAppDs
}
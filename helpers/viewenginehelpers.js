const path = require('path');
const fs = require('fs');


function getAppCss( p_app_name )
{
    return `<link rel="stylesheet" href="static/apps/${p_app_name}/index.css">`;
}

function getAppJs( p_app_name )
{
    return `<script type="text/javascript" src="static/apps/${p_app_name}/index.js" ></script>`;
}

function initAppDs( p_app_name )
{
    let r = '';
    let files = fs.readdirSync( `./frontend/source/apps/${ p_app_name }/ds` );
    if( files ) {
        r += '<script>';
        files.forEach((_f)=>{
            let config = require(`../frontend/source/apps/${ p_app_name }/ds/${ _f }`);
            r += `window.container.createDS(${ JSON.stringify(config) });`;
        });

        r += '</script>';
    }

    return r;
}

module.exports = {
    getAppCss, getAppJs, initAppDs
}
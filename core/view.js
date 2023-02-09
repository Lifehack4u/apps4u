const app = require("./app");
const helper = require("../helpers/viewenginehelpers");

function view( p_res, view_name, p_title, p_layout = 'default', p_data = {} )
{
    app.set('layout', `./templateengine/layouts/${p_layout}` );

        let data = Object.assign({
            "app_name": view_name, 
            "title": p_title ?? view_name,
            "helper": helper 
        }, p_data);
        p_res.render('apps/' + view_name + '/html/main' , data );
}

module.exports = {
    view
}
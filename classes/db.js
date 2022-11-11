let sql = require("mssql");
let config = require('../config/mssql.json');

class DataBase 
{
    constructor( p_req, p_res )
    {
        this.req = p_req;
        this.res = p_res;
        this.connected = false;
    }
    tables( p_table_name, p_view_name )
    {
        this.tableName = p_table_name;
        this.viewName = p_view_name;
        return this;
    }

    async select( p_stmt, p_params )
    {

        try {
            await sql.connect( config );
            let res = await sql.query(  `select ${ p_stmt } from ${ this.viewName }`, p_params );
            
            return res;
            
        } catch (error) {
            console.log('error : ', error );
            this.res.json({"select error": err });
        }
    }

    destroy( p_stmt, p_params )
    {
        let request = new sql.Request();
        return request.query(  `delete ${ p_stmt } from ${ this.tableName }`, p_params );
    }
}


module.exports = DataBase;
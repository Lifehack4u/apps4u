const mysql = require('./mysql');
const mssql = require('./mssql');

class Database {
    constructor( p_config )
    {
        if( p_config.driver === "mysql" ) {
            return new mysql( p_config );
        }

        if( p_config.driver === "mssql" ) {
            return new mssql( p_config );
        }
    }
}

module.exports = Database;
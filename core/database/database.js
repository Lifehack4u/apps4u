const mysql = require('./mysql');

class Database {
    constructor( p_config )
    {
        if( p_config.driver === "mysql" ) {
            return new mysql( p_config );
        }
    }
}

module.exports = Database;
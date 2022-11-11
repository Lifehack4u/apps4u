const sqlite = require('sqlite3').verbose();

/** Database calss
 * @class Database
 * @param string db_path
 * 
 * @return void
 */
class Sqlite {
    #db = null;
    constructor( db_path )
    {
        this.#db = sqlite.Database( db_path );
    }

    close()
    {

    }
    table( table_name )
    {
        return new Table( this , table_name );
    }

    sp( sp_name )
    {
        return new SP( this, sp_name );
    }
}
/** End */

/**
 * @calss Table - An instance of a table;
 * 
 * @param p_db
 */
class Table {
    #db = null;
    #tableName = null;
    constructor( p_db, table_name )
    {
        this.#db = p_db;
        this.#tableName = table_name;
    }

    select()
    {

    }

    update()
    {

    }

    destroy()
    {

    }

    create()
    {

    }
}
/** End */

/** Stored procedurre calss */
class SP {
    #db = null;
    #spName = null;
    constructor( p_db, sp_name )
    {
        this.#db = p_db;
        this.#spName = sp_name;
    }

    addParam( p_name, p_value  )
    {

    }

    call()
    {

    }
}
/** End */
function db( db_name )
{
    return new Sqlite( db_path );
}

module.exports = db;
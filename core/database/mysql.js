const mysql = require('mysql2');

class MySql {
    #_connection = null;
    constructor( p_config )
    {
        this.#_connection = mysql.createConnection({
            host: p_config.host,
            user: p_config.user,
            password: p_config.password,
            database: p_config.db_name
          });
    }

    table( table_name )
    {
        return new Table( table_name, this.#_connection );
    }
}

/**
 * driver.execute( sql, params, ( err, res, fields )=>{} );
 */
class Table {
    #_columns = '*';
    #_sql = null ;
    #_where = null;
    #_whereParams = [];
    #_groupBy = null;
    #_orderBy = null;
    #_limit = null;
    #_offset = null;
    #tableName = null;
    #driver = null;
    constructor( table_name, p_connection )
    {
        this.#tableName = table_name,
        this.#driver = p_connection;

    }

    columns( p_columns )
    {
        this.#_columns = p_columns;
        return this;
    }
    where( p_where, p_params )
    {
        this.#_where = p_where,
        this.#_whereParams = p_params;
        return this;
    }
    groupBy( p_columns )
    {
        this.#_groupBy = p_columns;
        return this;
    }
    limit( p_limit )
    {
        this.#_limit = p_limit;
        return this;
    }
    offset( p_offset )
    {
        this.#_offset = p_offset;
        return this;
    }
    orderBy( p_columns )
    {
        this.#_orderBy = p_columns;
        return this;
    }

    retriev()
    {
        let sql = ` SELECT ${this.#_columns} FROM ${this.#tableName} `;
        let params = [];
        if( this.#_where ) {
            sql += ` WHERE ${ this.#_where } `
        }

        if( this.#_groupBy ) {
            sql += ` GROUP BY ${ this.#_groupBy } `
        }

        if( this.#_orderBy ) {
            sql += ` ORDER BY ${ this.#_orderBy } `;
        }

        if( this.#_limit ) {
            sql += ` LIMIT ${ this.#_limit } `;

            if( this.#_offset ) {
                sql += ` OFFSET ${ this.#_offset } `;
            }

        }

        

        sql += ' ; ';

        return new Promise(( resolve, reject )=>{
            this.#driver.execute( sql, this.#_whereParams, ( err, res, fields )=>{
                if( err ) reject( err );

                resolve({ "result": res, "fields": fields });
            });
        });
    }

    update()
    {

    }

    create()
    {

    }

    destroy()
    {

    }

    query()
    {

    }
}


module.exports = MySql;
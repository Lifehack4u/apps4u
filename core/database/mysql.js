const mysql = require('mysql2');

class MySql {
    #_connection = null;
    constructor( p_config )
    {
        this.#_connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'test'
          });
    }

    table( table_name )
    {
        return new Table( table_name, this );
    }
}

/**
 * driver.execute( sql, params, ( err, res, fields )=>{} );
 */
class Table {
    #_columns = '*';
    #_sql = null ;
    #_where = null;
    #_whereParams = null;
    #_groupBy = null;
    #_orderBy = null;
    #_limit = null;
    #_offset = null;
    #tableNAme = null;
    #driver = null;
    constructor( table_name, p_db )
    {
        this.#tableName = table_name,
        this.#driver = p_db;

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
        let sql = ` SELECT ${this.#_columns} FROM ${this.#tableNAme} `;
        let params = {};
        if( this.#_where ) {
            sql += ` WHERE ${ this.#_where } `
        }

        if( this.#_limit ) {

            if( this.#_orderBy ) {
                sql += ` ORDER BY ${ this.#_orderBy } `;
            }

            sql += ` LIMIT ${ this.#_limit } `;

            if( this.#_offset ) {
                sql += ` OFFSET ${ this.#_offset } `;
            }

        }

        if( this.#_groupBy ) {
            sql += ` GROUP BY ${ this.#_groupBy } `
        }

        sql += ' ; ';

        return new Promise(( resolve, reject )=>{
            this.#driver.execute( sql, params, ( err, res, fields )=>{
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
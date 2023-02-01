var tedious = require('tedious');

class Mssql {

    #_connection = null;

    constructor( p_config )
    {
        this.#_connection = new tedious.Connection( p_config );

        
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
        console.log(' retriev sql : ', sql );

        return new Promise(( resolve, reject )=>{

            this.#driver.on('connect', function( err ){
                console.log(' on connect : ');
                if( err ) {
                    reject( err );
                    this.#driver.close();
                }

            })

            let request = new tedious.Request( sql , function(err, rowCount) {
                console.log(' request ...')
                if (err) {
                  console.log(err);
                  reject( err );
                  this.#driver.close();
                } else {
                  console.log(rowCount + ' rows');
                  // and we close the connection
                  this.#driver.close();
                }
              });
          
              request.on('row', function(columns) {

                resolve({ "result": columns });
              });
          
              this.#driver.execSql(request);
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


module.exports = Mssql;
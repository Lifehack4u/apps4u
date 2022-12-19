

class DBService {
    constructor( p_config )
    {

    }
}


module.exports = DBService;

/** How it should look like ? */
/// let db = new DBService( { "user":"username", "pass": "password", "dbname":"root","driver":"mysql" } );
/// db.table('users').where(' name = :name',{"name": "ahmad"}).getFirst();
/// db.table('users').columns(['ID','Name']).groupBy(['ID']).where(' name = :name',{"name": "ahmad"}).getFirst().then().catch();
// db.table('users').columns(['ID','Name']).groupBy(['ID']).orderBy([]).where(' name = :name', {"name": "ahmad"} ).getFirst().then().catch();
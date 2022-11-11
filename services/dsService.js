const db = require('../libs/db');


function retrive( p_req, p_res )
{
    if( !METHODS.includes( p_req.method ) ) return {"message":"Method not allowed"};

    return {"message":"Retrive method"};
}


/**All functions must return a JSON object or Array of JSON objects*/
class DsService {
    constructor( p_req, p_res )
    {
        super(p_req, p_res);
        this.methods = 'POST|GET';
        
    }
    retrive()
    {
        return this.p_req
    }
}
module.exports = DsService ;


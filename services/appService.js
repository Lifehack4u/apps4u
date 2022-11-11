const BaseService = require('./baseService');
const fs = require('fs');


class AppService extends BaseService
{ 
    constructor( p_req, p_res )
    {
        super(p_req, p_res);
        this.methods = 'POST|GET';
        
    }

    index()
    {
        return {"message":"DONE"};
    }
    
}

module.exports = AppService;
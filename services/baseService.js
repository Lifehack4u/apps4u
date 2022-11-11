const methodes = ['GET', 'POST', 'PUT', 'DELETE', 'PAtch'];

class BaseService {
    
    constructor( p_req, p_res )
    {
        this.req = p_req;
        this.res = p_res;
        this.methods = 'POST|GET';
    }

    vlaidateHttpMethod()
    {
        let acceptedMethod = this.methods.split( '|' );
        return acceptedMethod.includes( this.req.method );
    }
}

module.exports = BaseService;
function validateHttpMethod( p_req, p_methods )
{
    return p_methods.includs( p_methods.includes( p_req.method ) );
}
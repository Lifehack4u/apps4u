let users = [];


function addUser( f_name, l_name )
{
    // let obj = { "first_name": f_name, "lastName": l_name }

    // users.push( obj );

    conn.create('user', { "first_name": f_name, "lastName": l_name });
}

function _users()
{
    // return users;

    return conn.create('user');
}



module.exports = {
    addUser,
    _users
}
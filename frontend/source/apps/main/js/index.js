

fetch('/login', { 
    'method':'post',
    headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
        "user": $('#user').val(), 
        'key': $('#key').val() 
    }) 
}) 
.then( response => {
    return response.json()
} )
.then( res => {
    console.log(' res : ', res );
    if(  res.code === 0 ) {
        // Show error message
        alert('Error');
    }
    
} )
.catch( err=>{
    console.error(' err: ', err );
} )
//console.log('This is school');
//alert('BOOKMEAPP!');

function openForm() {
    //document.getElementById("popupForm").style.display = "block";
    $("#popupForm").css("display","block");
}

/// Issue 10747

/// Subscribe to an event form a javascript file to open the forme
$('#forbusiness').on('click', function(){
    $("#popupForm").css("display","block");
})




function closeForm() {
    //document.getElementById("popupForm").style.display = "none";
    $("#popupForm").css("display","none");
    
}


/// Subscribe to an event form a javascript file to close the form
$('.close-forme').on('click', function(){
    $("#popupForm").css("display","none");
})


$('#login').on('click', function(){
    fetch('/bookmeapp/login', {method:'post', headers:{'Content-Type':"application/json"}, body: JSON.stringify({
        "name": $('#email').val(),
        "password": $('#psw').val()
        })
    })

/*    
    .then( response => {
        return response.json()
    })
    
    .then( res => {
        console.log('res: ', res);
    })

    .catch( err => {
        console.error('err: ,', err);
    })
 */   
    .then (function(response){
/////////////////////////////////////////////////////////////////////        
        console.log('server responded');
        if (response.status == 200)
          return response.text();          
        else
/////////////////////////////////////////////////////////////////////        
           return response.json()})
    .then (function(data){            
        document.body.innerHTML = data    
        console.log('data:',data)

    })
    
})



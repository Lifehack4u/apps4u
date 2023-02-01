//console.log('This is school');
alert('BOOKMEAPP!');

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


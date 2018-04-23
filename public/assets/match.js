$(document).ready(()=>{
   
    $.getJSON( "api/user/match", function( data ) {
        $('#matchedUser').text(data.user.name + " is offering " + data.user.container + " containers!");
        $('#matchedUser').append('<br><br><a class="button is-primary" href="/chat">Communicate</a>');
    });
    
});
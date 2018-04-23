/* global $ */
/* global io */
$(document).ready(()=>{
    
    var socket = io();
    
    socket.on('chat message', function(msg){
      $('#messages').append($('<li class="chat-message">').text(msg));
    });
    
     $('#chatSubmit').on('click', function(){
        let message = $('#chatMessage').val();
        
        if(message.length <= 0) { return; }
         
        socket.emit('chat message', message);
        $('#chatMessage').val('');
    });
    
});
var socket = io.connect();
var onlineUsers = {};
var myUser;
$(document).ready(function(){
    initialiseChat();
    
    function initialiseChat(){
        socket.emit('logged-in');
    }
})
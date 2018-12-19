var student_model = require('../models/students');
global. onlineUsers = [];

var initChat = function(socket , session , callback) {
    var user =  { id: socket.id , name : session.username }
    if(onlineUsers.indexOf(user) == -1) {
        onlineUsers.push(user);
    }
    
    callback(onlineUsers);
} 

module.exports =  {
    initChat : initChat
}


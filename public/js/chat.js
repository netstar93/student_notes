$(document).ready(function(){
    loginMe();
    function submitfunction(){
        var message = {};
        text = $('#txtChatMessage').val();
      
        if (text != '') {
          message.type = 'text';
          message.text = text;
          message.sender = myUser.id;
          message.receiver = myFriend.id;
          // Function call to send attached file to sender/seceiver in chatbox
        }
        $('#txtChatMessage').val('').focus();
    }

    // Function to ask user to supply his/her name before entering a chatbox
function loginMe() {
    var person = prompt("Please enter your name:", "Sandip Salunke");
    if (/([^\s])/.test(person) && person != null && person != "") {
      //$('#user').val(person);
      socket.emit('newUser', person);
      document.title = person;
    } else {
      location.reload();
    }
  }
})
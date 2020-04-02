var socket = io('localhost:3000');

function renderMessage(message){
  $('.messages').append('<div class="message"><strong>'+ message.author +':</strong>'+ message.message +'</div>');
}

socket.on('recivedMessage', function(message){
  renderMessage(message);
});

$('#chat').submit(function(event) {
  event.preventDefault();      

  var author = $('input[name=username]').val();
  var message = $('input[name=message]').val();

  if(author.length && message.length){
    var messageObject = {
      author: author,
      message: message
    };
    renderMessage(messageObject);
    socket.emit('sendMessage', messageObject);
    document.getElementById('message').value='';
  }
  
});
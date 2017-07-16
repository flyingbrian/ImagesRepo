var socket = io();

function getMessage(data)
{
	console.log(data.numUsers);
}

socket.emit('I Just Joined');

// Whenever the server emits 'new message', update the chat body
socket.on('I Just Joined', function (data) {
    getMessage(data);
  });

// Whenever the server emits 'user joined', log it in the chat body
 socket.on('user joined', function (data) {
    getMessage(data);
  });
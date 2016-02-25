var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.json({
		message: 'Why dont you come on down and get some mangos :)'
	});
});

app.get('/notify', function(rew, res){

});

io.on('connection', function(socket){
  console.log('a user connected');

  setInterval(() => {
  	console.log('alerting')
  	socket.emit('notify', 'Welcome to MangoHacks :)');
  }, 10000);

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
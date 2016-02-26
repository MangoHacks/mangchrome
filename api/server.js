var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.json({
		message: 'Why dont you come on down and get some mangos :)'
	});
});

io.on('connection', function(socket){
	console.log('a user connected');

	// setInterval(() => {
	// 	console.log('alerting');
	// 	socket.emit('notify', 'Welcome to MangoHacks :)');
	// }, 10000);

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

app.get('/notify', function(rew, res){
	console.log('we are hitting notify');
	io.emit('notify', 'this notification is being triggered by the /notify endpoint');
	return res.json({
		message: 'this notification is being triggered by the /notify endpoint'
	});

});

app.post('/notify', function(req, res){
	console.log(req, req.body)
	io.emit('notify', req.body);
	return res.json(req.body);
});

http.listen(8081, function(){
	console.log('listening on *:3000');
});
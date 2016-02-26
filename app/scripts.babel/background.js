'use strict';
// var socket = io('http://app.teambwb.com');
var socket = io('http://localhost:8081')
var num = 0;

socket.on('connect', function(){
	console.log(' extension is connected to the socket server')
});

socket.emit('message');

socket.on('notify', (msg) => {
	chrome.notifications.create('mango', {
		type: 'basic',
		title: 'MangoHacks',
		message: msg.message || msg,
		iconUrl: 'http://mangohacks.com/apple-icon-72x72.png'
	}, (e) =>{
		num++
		console.log('event was a success: ', e);
		console.log(`system got message: ${msg}`);
		num && chrome.browserAction.setBadgeText({text: num});
	});
});
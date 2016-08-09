var debug = require('debug')('io');
var io = require('socket.io')();

io.clients = {}

var guest = io.of('/guest');
guest.on('connection', function(socket){

	debug('Connection to %s.', '/guest');
	var id = socket.client.id;

	io.clients[id] = io.clients[id] || {}
	socket.on('disconnect', function(){
		delete io.clients[id];
	});

	socket.on('set', function(key, value){
		debug('set %s:%s', key, value);
		io.clients[id][key] = value;
	});

});

var admin = io.of('/admin');
admin.on('connection', function(socket){

	debug('Connection to %s.', '/admin');
	var id = socket.client.id;

	io.clients[id] = io.clients[id] || {}
	socket.on('disconnect', function(){
		delete io.clients[id];
	});

	socket.on('set', function(key, value){
		debug('set %s:%s', key, value);
		io.clients[id][key] = value;
	});

});

module.exports = io;
var debug = require('debug')('io');
var io = require('socket.io')();
//var socketioJWT = require('socketio-jwt');



var clientsStore = require('./lib/ClientsStore');

io.on('connection', function(socket){
	storeBasics(socket)
});

var guest = io.of('/guest');
guest.on('connection', function(socket){
	storeBasics(socket);
});

var admin = io.of('/admin');
admin.on('connection', function auth(socket){
	
	socket.on('authenticated', function(){
		console.log('authed')
	});

	socket.on('authentication', function(data){
		
		if (!data) {
			socket.emit('unauthorized', {
				status : 400,
				message : 'Credentials required.'
			});
			return socket.disconnect();
		}
		
		if (data.token === 'axel.dolce') {
			socket.emit('authenticated');
			storeBasics(socket);
		} else {
			socket.emit('unauthorized', {
				status : 401,
				message : 'Invalid credentials.'
			});
			socket.disconnect();
		}
	});

});

function storeBasics(socket){

	var id = socket.id;
	console.log(socket)
	
	clientsStore.set(id, {});

	clientsStore.on(id + '.change', function(data){
		socket.emit('change', clientsStore.get(id));
	});

	socket.on('set', function(key, value, cb){
		console.log('set', {key,value})
		clientsStore.set(id, {
			[key] : value
		});
		if (typeof arguments[arguments.length-1] === 'function') {
			arguments[arguments.length-1]( clientsStore.get(id) );
		}
	});

	socket.on('get', function(key){
		
		var callback = arguments[arguments.length - 1];
		(typeof key === 'function') ? callback( clientsStore.get(id) ) : callback( clientsStore.get(id)[key] )

	});

	socket.on('disconnect', function(){
		delete clientsStore.delete(id);
	});

}

module.exports = io;
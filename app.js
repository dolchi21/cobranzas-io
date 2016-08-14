var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function CORS(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/counters', function counters(req, res){

	var io = require('./io');
	
	res.json({
		admin : countSockets(io.of('/admin')),
		guests : countSockets(io.of('/guest'))
	});

	function countSockets(nsp){
		if (!nsp) { return 0; }
		var clients = nsp.sockets;
		return Object.keys( clients ).length;
	}

});

var clientsStore = require('./lib/ClientsStore');

app.get('/who', function(req, res){

	res.json( clientsStore.get() );

});
app.get('/who/:socket_id?', function(req, res){
	
	var id = req.params.socket_id;

	res.json( clientsStore.get(id) );

});

module.exports = app;
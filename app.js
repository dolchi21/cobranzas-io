var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/counters', function counters(req, res){

	var io = global.io;
	
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

app.get('/who/:socket_id?', function(req, res){

	var io = global.io;
	
	var id = req.params.socket_id;

	var json = (id) ? io.clients[id] : io.clients;

	res.json(json)

});

module.exports = app;
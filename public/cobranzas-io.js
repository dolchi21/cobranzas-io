var EventEmitter = require('events');
var store = require('store');
var util = require('util');

function CobranzasIO(socket, options){

	var self = this;
	this._socket = null;

	function set(key, value){
		return new Promise(function(resolve, reject){
			self._socket.emit('set', key, value, resolve);
		});
	}
	function get(key){
		return new Promise(function(resolve, reject){
			
			var cb = function(data){ resolve(data); }

			(key === undefined) ? self._socket.emit('get', cb) : self._socket.emit('get', key, cb)

		});
	}
	function setSocket(socket){
		this._socket = socket;
		this._socket.on('change', function(){
			self.emit('change');
		});
		this._socket.on('disconnect', function(){
			self.emit('disconnect');
		})
	}

	this.get = get;
	this.set = set;
	this.setSocket = setSocket;

	EventEmitter.call(this);

	(function init(socket, options) {
		this.setSocket(socket);
	}.bind(this))(socket, options)
}
util.inherits(CobranzasIO, EventEmitter);



CobranzasIO.connect = function connect(nsp, options){
	
	var options = options || {}

	return new Promise(function(resolve, reject){
		var socket = io.connect(nsp || '/');
		var cio = new CobranzasIO(socket);
		
		socket.on('connect', function(){

			var resolve_if_no_error = setTimeout(function(){
				resolve(cio);
			}, 1000);

			socket.on('unauthorized', function(err){
				clearTimeout(resolve_if_no_error);
				reject(err);
			});

			if (options.authentication) {

				clearTimeout(resolve_if_no_error);

				socket.emit('authentication', options.authentication);

				socket.on('authenticated', function(){
					resolve(cio);
				});
			}
		});

		socket.on('error', function(err){
			reject(err);
		});
	});
}

module.exports = CobranzasIO;
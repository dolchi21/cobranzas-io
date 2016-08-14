var EventEmitter = require('events');
//var util = require('util');

class ClientsStore extends EventEmitter {
	
	constructor(){
		super();
		this.clients = {}
	}

	set (id, data) {
		var client = this.clients[id] || {};
		this.clients[id] = Object.assign({}, client, data);
		this.emitChange(id);
	}

	delete (id) {
		delete this.clients[id];
		this.emitChange();
	}

	get (id) {
		if (id === undefined) {
			return this.clients;
		}
		return this.clients[id];
	}

	emitChange (nsp) {
		var namespace = (nsp) ? nsp+'.' : '';
		this.emit('change');
		this.emit(namespace + 'change');
	}

}

module.exports = new ClientsStore();
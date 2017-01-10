'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _hoek = require('hoek');

var _hoek2 = _interopRequireDefault(_hoek);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({
	host: 'localhost',
	port: 8000
});

server.register([require('vision'), require('inert')], function (err) {
	_hoek2.default.assert(!err, err);

	server.views({
		engines: {
			'html': {
				module: _handlebars2.default,
				compileMode: 'sync'
			}
		},
		compileMode: 'async',
		path: 'dist/templates',
		layoutPath: 'dist/templates/layout',
		helpersPath: 'dist/templates/helpers',
		partialsPath: 'dist/templates/partials',
		layout: 'layout'
	});

	// add the route
	server.route({
		method: 'GET',
		path: '/',
		handler: {
			view: {
				template: 'index',
				context: {
					title: 'Something Cool'
				}
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/products',
		handler: {
			view: {
				template: 'products',
				context: {
					title: 'Products'
				}
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/fonts/ratchicons.ttf',
		handler: function handler(request, reply) {
			reply.file('assets/ratchet/fonts/ratchicons.ttf');
		}
	});

	server.route({
		method: 'GET',
		path: '/ratchet.js',
		handler: function handler(request, reply) {
			reply.file('assets/ratchet/js/ratchet.min.js');
		}
	});

	server.route({
		method: 'GET',
		path: '/fonts/ratchicons.woff',
		handler: function handler(request, reply) {
			reply.file('assets/ratchet/fonts/ratchicons.woff');
		}
	});

	server.route({
		method: 'GET',
		path: '/application.js',
		handler: function handler(request, reply) {
			reply.file('assets/js/app.js');
		}
	});

	server.route({
		method: 'GET',
		path: '/index.js',
		handler: function handler(request, reply) {
			reply.file('assets/js/index.js');
		}
	});

	server.route({
		method: 'GET',
		path: '/ratchet.css',
		handler: function handler(request, reply) {
			reply.file('assets/ratchet/css/ratchet.css');
		}
	});

	server.route({
		method: 'GET',
		path: '/styles.css',
		handler: function handler(request, reply) {
			reply.file('assets/css/styles.css');
		}
	});

	server.route({
		method: 'GET',
		path: '/pageslider.css',
		handler: function handler(request, reply) {
			reply.file('assets/css/pageslider.css');
		}
	});
});

server.start(function (err) {
	if (err) {
		throw err;
	}
	console.log("server running at: " + server.info.uri);
});
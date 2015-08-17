'use strict';

//
// Simple proxy configuration to redirect calls to a remote backend server.
// Configure proxy settings in config.proxies to enable correct routings
//

var proxyMiddleware = require('http-proxy-middleware');
var config = require('./config')();

function getMiddleware() {
	var middlewares = [];
	config.proxies.forEach(function(route) {
        // configure proxy middleware 
		var context = route.from                     // requests with this path will be proxied 
		var options = {
		        target: route.to,
		        headers: ''
		    };
		 
		// create the proxy 
		var proxy = proxyMiddleware(context, options);

        middlewares.push(proxy);
    });

    return middlewares;
}

module.exports = getMiddleware() || [];


 

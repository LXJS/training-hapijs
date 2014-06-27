// Load modules

var Hapi = require('hapi');


var hasHelloPlugin = {
    register: function (plugin, options, next) {

        plugin.expose('hello', 'Hello Plugin');
        next();
    }
};

hasHelloPlugin.register.attributes = {
    name: 'example',
    version: '0.0.1'
};


var usesHelloPlugin = {
    register: function (plugin, options, next) {

        plugin.dependency('example');
        console.log(plugin.plugins.example.hello);

        next();
    }
};

usesHelloPlugin.register.attributes = {
    name: 'uses-hello',
    version: '0.0.1'
};


var server = new Hapi.Server(8080);
server.pack.register(hasHelloPlugin, function (err) {});
server.pack.register(usesHelloPlugin, function (err) {});

server.start();
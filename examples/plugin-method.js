var Hapi = require('hapi');
var server = new Hapi.Server();

// Simple arguments

var add = function (a, b, next) {

    next(null, a + b);
};

server.method('sum', add, { cache: { expiresIn: 2000 } });

server.methods.sum(4, 5, function (err, result) {

    console.log(result);
});

// Object argument

var addArray = function (array, next) {

    var sum = 0;
    array.forEach(function (item) {

        sum += item;
    });

    next(null, sum);
};

server.method('sumObj', addArray, {
    cache: { expiresIn: 2000 },
    generateKey: function (array) {

        return array.join(',');
    }
});

server.methods.sumObj([5, 6], function (err, result) {

    console.log(result);
});

// Outputs:
// 9
// 11
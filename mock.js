var ramlMocker = require('raml-1-mocker');
var options = {
    path: '.'
};


var callback = function (ramlRequests){
    var express = require('express')
    var app = express()

    ramlRequests.forEach(function(reqToMock){
        app[reqToMock.method](reqToMock.uri, function(req,res){
            var code = 200;
            if (reqToMock.defaultCode) {
                code = reqToMock.defaultCode;
            }
            res.send(code ,reqToMock.example());
        });
    });

    app.listen(3000, function () {
      console.log('Mock server started')
    })
};
ramlMocker.generate(options, callback);

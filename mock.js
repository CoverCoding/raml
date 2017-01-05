var ramlMocker = require('raml-1-mocker');
var options = {
    path: '.'
};


var callback = function (ramlRequests){
    var express = require('express')
    var app = express()
    app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

    ramlRequests.forEach(function(reqToMock){
        app[reqToMock.method](reqToMock.uri, function(req,res){
            var code = 200;
            if (reqToMock.defaultCode) {
                code = reqToMock.defaultCode;
            }
            res.status(code).send(reqToMock.example());
        });
    });

    app.listen(process.env.PORT || 3000, function () {
      console.log('Mock server started')
    })
};
ramlMocker.generate(options, callback);

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    io = require('socket.io')(http),
    ioc = require('socket.io-client'),
    socket = ioc.connect('http://home-sensor-api-jcthedude.c9users.io:8080', {
        reconnect: true
    }),
    ip = process.env.IP;

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public/')));

app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: "./"
    });
})

app.get('/index.js', function(req, res) {
    res.sendFile('index.js', {
        root: "./assets/js/"
    });
})

socket.on('connect', function(socket) {
    console.log('Socket.io client connected.');
});

socket.on('postEvent', function(data) {
    console.log(data.device_guid + ' ----- ' + data.timestamp);
});

http.listen(app.get('port'), function() {
    console.log('Sensor Event App listening on port ' + app.get('port'));
});

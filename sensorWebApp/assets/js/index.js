var socket = io.connect('http://home-sensor-api-jcthedude.c9users.io:8080');

var vm = new Vue({
    el: '#app',
    data: {
        device_guid: 'Waiting for first reading...',
        device_name: 'Waiting for first reading...',
        timestamp: 'Waiting for first reading...',
        sensor_readings: {}
    },
    created: function() {
        socket.on('postEvent', function(data) {
            this.device_guid = data.device_guid;
            this.device_name = data.device_name;
            this.timestamp = Date(data.timestamp).toString();
            this.sensor_readings = data.sensor_readings;
        }.bind(this));
    }
});
